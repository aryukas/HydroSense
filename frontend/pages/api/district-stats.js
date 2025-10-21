export default function handler(req, res) {
  const { id } = req.query;

  // Dummy simulated data
  const mockData = {
    district: `District #${id}`,
    ndvi: (Math.random() * 100).toFixed(2),
    rainfall: (Math.random() * 300).toFixed(2),
    dryness: (Math.random() * 50).toFixed(2),
    temperature: (20 + Math.random() * 15).toFixed(1),
    humidity: (30 + Math.random() * 40).toFixed(1),
  };

  res.status(200).json(mockData);
}
