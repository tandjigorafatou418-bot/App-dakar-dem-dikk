import React from 'react';
import { Download } from 'lucide-react';

export default function TicketDownload({ ticket }) {
  const downloadTicket = () => {
    const ticketContent = `
      DAKAR DEM DIKK - BILLET ÉLECTRONIQUE
      =====================================
      
      Référence: ${ticket.id}
      Trajet: ${ticket.route}
      Date: ${ticket.date}
      Heure: ${ticket.time}
      Places: ${ticket.seats}
      Passager: ${ticket.passengerName || 'Client'}
      Prix: ${ticket.price} FCFA
      Statut: ${ticket.status}
      
      =====================================
      Conservez ce billet pour votre voyage
      Support: +221 33 123 45 67
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `billet-${ticket.id}.txt`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const printTicket = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Billet ${ticket.id}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .ticket { border: 2px solid #10B981; padding: 20px; max-width: 400px; margin: 0 auto; }
              .header { text-align: center; margin-bottom: 20px; }
              .info { margin: 10px 0; }
              .qr-placeholder { width: 100px; height: 100px; border: 1px solid #ccc; margin: 20px auto; }
            </style>
          </head>
          <body>
            <div class="ticket">
              <div class="header">
                <h2>DAKAR DEM DIKK</h2>
                <p>BILLET ÉLECTRONIQUE</p>
              </div>
              <div class="info"><strong>Référence:</strong> ${ticket.id}</div>
              <div class="info"><strong>Trajet:</strong> ${ticket.route}</div>
              <div class="info"><strong>Date:</strong> ${ticket.date}</div>
              <div class="info"><strong>Heure:</strong> ${ticket.time}</div>
              <div class="info"><strong>Places:</strong> ${ticket.seats}</div>
              <div class="info"><strong>Prix:</strong> ${ticket.price} FCFA</div>
              <div class="qr-placeholder">QR CODE</div>
              <p style="text-align: center; font-size: 12px;">
                Présentez ce billet lors de votre voyage<br>
                Support: +221 33 123 45 67
              </p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={downloadTicket}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
      >
        <Download className="w-4 h-4 mr-1" />
        Télécharger
      </button>
      <button
        onClick={printTicket}
        className="text-sm text-gray-600 hover:text-gray-700 font-medium"
      >
        Imprimer
      </button>
    </div>
  );
}
