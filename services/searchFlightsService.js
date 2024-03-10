const admin = require("firebase-admin");
class SearchFlightsService {
  // async searchFlights(req, res) {
  //   try {
  //     console.log("entered search")
  //     const { from, to, date } = req.query;

  //     if (!from || !to || !date) {
  //       return res.status(400).json({ error: 'Invalid parameters. Make sure to provide "from", "to", and "date".' });
  //     }
  //    // Get reference to Firestore collection
  //     const flightsCollection = admin.firestore().collection('Flights'); // replace 'flights' with your actual collection name
  //    // Perform the query to get flights based on the search parameters
  //     const flightList = await flightsCollection
  //       .where('data.departureCity', '==', from)
  //       .where('data.destinationCity', '==', to)
  //       .where('data.date', '==', date)
  //       .get();

  //     const flights = [];
  //     flightList.forEach((doc) => {
  //       flights.push(doc.data());
  //     });

  //     res.json(flights);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // }

  async searchFlights(req, res) {
    try {
      
      console.log("entered search");
      const { from, to, date, page, limit,sortBy,sortOrder } = req.query;
      console.log(from,to,date,page,limit,sortBy,sortOrder);
  
      // Basic validation for limit parameter
      if (isNaN(limit) || limit <= 0) {
        return res.status(400).json({
          error: 'Invalid "limit" parameter. Must be a positive integer within a reasonable range.',
        });
      }
  
      // Convert limit to an integer
      const currentpage=parseInt(page)
      const pageSize = parseInt(limit, 10);
      const pageNumber = parseInt(page, 10);
  
      // if (!from || !to || !date) {
      //   return res.status(400).json({
      //     error: 'Invalid parameters. Make sure to provide "from", "to", and "date".',
      //   });
      // }
  
      const flightsCollection = admin.firestore().collection("Flights");
      const flightQuery = flightsCollection
        .where("data.destinationCity", "==", to)
        .where("data.departureCity", "==", from)
        .where("data.date", "==", date) 
        .orderBy('data.departureTime' , sortOrder)
  
      const totalRecords = (await flightQuery.get()).size;
      const totalPages = Math.ceil(totalRecords / pageSize);
      const offset = (pageNumber - 1) * pageSize;
  
      const flightList = await flightQuery
        .offset(offset)
        .limit(pageSize)
        .get();
  
      const flights = [];
      flightList.forEach((doc) => {
        flights.push(doc.data());
      });
  
      res.json({
        flights,
        totalPages,
        currentPage: currentpage,
        pageSize,
        totalRecords
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while processing your request." });
    }
  }
  
}
module.exports = new SearchFlightsService();
