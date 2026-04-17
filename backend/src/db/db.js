
const mongoose = require("mongoose")
const dns = require("dns")

const dnsServers = process.env.DNS_SERVERS
if (dnsServers) {
  dns.setServers(dnsServers.split(",").map(server => server.trim()))
}

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to Db successfully")
  } catch (error) {
    console.log("MongoDB connection error:", error)
    process.exit(1)
  }
}

module.exports = connectToDb;