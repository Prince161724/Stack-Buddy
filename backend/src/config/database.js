import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // MongoDB connection string - always use Stackbuddy database (matching existing case)
    let mongoUri = process.env.MONGO_URI || "mongodb+srv://root:moot@hotel.zl9hnzd.mongodb.net/Stackbuddy?appName=Hotel";
    
    // Force database name to be exactly 'Stackbuddy' (capital S and B)
    // Parse the URI and reconstruct it with the correct database name
    const urlPattern = /^(mongodb\+srv:\/\/[^\/]+)\/([^?]*)(\?.*)?$/;
    const match = mongoUri.match(urlPattern);
    
    if (match) {
      // Reconstruct with Stackbuddy as database name
      const baseUrl = match[1];
      const queryString = match[3] || '?appName=Hotel';
      mongoUri = `${baseUrl}/Stackbuddy${queryString}`;
    } else {
      // Fallback: simple replacement
      mongoUri = mongoUri.replace(/\/[^\/\?]*(\?|$)/, '/Stackbuddy$1');
      if (!mongoUri.includes('/Stackbuddy')) {
        mongoUri = mongoUri.replace(/\/(\?|$)/, '/Stackbuddy$1');
      }
    }
    
    console.log(`Connecting to MongoDB with URI: ${mongoUri.replace(/:[^:@]+@/, ':****@')}`);
    // Explicitly set the database name in connection options
    await mongoose.connect(mongoUri, {
      dbName: 'Stackbuddy'  // Explicitly set database name
    });
    console.log(`MongoDB connected to database: Stackbuddy`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
