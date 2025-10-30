import React, { useState, useEffect } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import QRCode from 'qrcode';

export default function QRCodeModal({ isOpen, onClose, ticket }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (isOpen && ticket) {
      const generateQRCode = async () => {
        try {
          const qrData = JSON.stringify({
            ticketId: ticket.id,
            route: ticket.route,
            date: ticket.date,
            time: ticket.time,
            seats: ticket.seats,
            passenger: ticket.passengerName || 'Client',
            price: ticket.price,
            validatedAt: new Date().toISOString()
          });

          const url = await QRCode.toDataURL(qrData, {
            width: 300,
            margin: 2,
            color: {
              dark: '#10B981',
              light: '#FFFFFF'
            }
          });
          setQrCodeUrl(url);
        } catch (error) {
          console.error('Erreur génération QR code:', error);
        }
      };

      generateQRCode();
    }
  }, [isOpen, ticket]);

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `billet-${ticket.id}.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const shareTicket = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon billet Dakar Dem Dikk',
          text: `Billet pour ${ticket.route} le ${ticket.date} à ${ticket.time}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">QR Code du Billet</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Référence:</span>
                <span className="font-medium">{ticket.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trajet:</span>
                <span className="font-medium">{ticket.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{ticket.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Heure:</span>
                <span className="font-medium">{ticket.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Places:</span>
                <span className="font-medium">{ticket.seats}</span>
              </div>
            </div>

            {qrCodeUrl && (
              <div className="flex justify-center mb-4">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
              </div>
            )}

            <p className="text-xs text-gray-500">
              Présentez ce QR code lors de votre voyage
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={downloadQRCode}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </button>
            <button
              onClick={shareTicket}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
