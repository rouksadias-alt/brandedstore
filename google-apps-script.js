/**
 * LÉGER — Export de pedidos vers Google Sheets.
 *
 * INSTALLATION:
 * 1. Ouvrir le sheet: https://docs.google.com/spreadsheets/d/1VdwDWVKIaCFx1bqMZ9KBUDtQOZbIQfnyoUt2KRyteKg/edit
 * 2. Extensions -> Apps Script
 * 3. Coller ce fichier entier (remplacer le contenu par defaut)
 * 4. Cliquer Deployer (Deploy) -> Nouveau deploiement (New deployment)
 *      - Type: Application Web (Web app)
 *      - Executer en tant que: Moi (Me)
 *      - Qui a acces: Tout le monde (Anyone)
 * 5. Autoriser les permissions demandees (compte Google proprietaire du sheet)
 * 6. Copier l'URL "Application Web" generee (se termine par /exec)
 * 7. La coller comme valeur de GOOGLE_SHEETS_WEBHOOK_URL:
 *      - dans backend/docker-compose.yml (ligne GOOGLE_SHEETS_WEBHOOK_URL=${GOOGLE_SHEETS_WEBHOOK_URL:-...})
 *      - OU dans les Variables d'environnement du service backend sur Easypanel
 * 8. Redeployer le backend (Rebuild without cache)
 *
 * Chaque nouvelle commande passee sur le site apparaitra automatiquement
 * comme une nouvelle ligne dans l'onglet actif du sheet.
 */

const HEADERS = [
  "order_id",
  "created_at",
  "name",
  "phone",
  "address",
  "city",
  "province",
  "product",
  "plan",
  "bump",
  "express",
  "total_usd",
  "notes",
  "status",
];

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ensureHeaders(sheet);

    const data = JSON.parse(e.postData.contents);

    const row = HEADERS.map((key) => {
      const value = data[key];
      return value === undefined || value === null ? "" : value;
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const isEmpty = firstRow.every((cell) => cell === "" || cell === null);
  if (isEmpty) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

/** Utilitaire pour tester manuellement depuis l'editeur Apps Script. */
function testDoPost() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        order_id: "test-1234",
        created_at: new Date().toISOString(),
        name: "Cliente de Prueba",
        phone: "+50760000000",
        address: "Calle Falsa 123",
        city: "Panama",
        province: "Panama",
        product: "Roll-On Crioactivo",
        plan: "2 Roll-On",
        bump: true,
        express: false,
        total_usd: 48,
        notes: "",
        status: "pending_confirmation",
      }),
    },
  };
  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
