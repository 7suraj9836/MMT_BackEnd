const admin = require('firebase-admin');
class SearchFlightsService {
  async searchFlights(req, res) {
    try {
      console.log("entered search")
      const { from, to, date } = req.query;

      if (!from || !to || !date) {
        return res.status(400).json({ error: 'Invalid parameters. Make sure to provide "from", "to", and "date".' });
      }
     // Get reference to Firestore collection
      const flightsCollection = admin.firestore().collection('Flights'); // replace 'flights' with your actual collection name
     // Perform the query to get flights based on the search parameters
      const flightList = await flightsCollection
        .where('data.departureCity', '==', from)
        .where('data.destinationCity', '==', to)
        .where('data.date', '==', date)
        .get();

      const flights = [];
      flightList.forEach((doc) => {
        flights.push(doc.data());
      });

      res.json(flights);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

 
}
module.exports = new SearchFlightsService();
