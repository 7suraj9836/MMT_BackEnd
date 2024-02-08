const admin = require('firebase-admin');

class CitiesService {
    async getCities(req, res) {
        console.log(8)
        try {
            console.log(9)
          const citiesCollection = admin.firestore().collection('Cities');
    
          const cityList = await citiesCollection.get();
          console.log("cityList:",cityList);
          const cities = [];
    
          cityList.forEach((city) => {
            // Assuming each city document has a 'name' field
             const cityData = city.data();
             cities.push(cityData);
            
          });
    
          return res.json(cities);
        } catch (error) {
            console.log(6);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
}

module.exports = new CitiesService();
