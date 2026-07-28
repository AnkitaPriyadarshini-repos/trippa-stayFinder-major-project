const Listing = require("../models/listing");
const mongoose = require("mongoose");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
//const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const sampleListings = [
    // --- Trending (4 Stays) ---
    {
        _id: "sample1",
        title: "Cozy Beachfront Villa",
        description: "Escape to this beautiful beachfront villa with stunning ocean views, private infinity plunge pool, and direct beach access.",
        image: { url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2500, location: "Malibu", country: "United States", category: "Trending", rating: 4.95, reviewsCount: 48, reviews: [], owner: { username: "VillaHost" }, geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
    },
    {
        _id: "sample12",
        title: "Cliffside Sunset Villa with Infinity Pool",
        description: "Perched over the Aegean sea featuring iconic whitewashed architecture, private Jacuzzi, and caldera sunset views.",
        image: { url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 4800, location: "Santorini", country: "Greece", category: "Trending", rating: 4.97, reviewsCount: 92, reviews: [], owner: { username: "SantoriniHost" }, geometry: { type: "Point", coordinates: [25.4317, 36.3932] }
    },
    {
        _id: "sample13",
        title: "Bali Tropical Jungle Villa & Pool",
        description: "Lush jungle sanctuary surrounded by bamboo groves, private infinity pool, and open-air pavilion lounge.",
        image: { url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 3100, location: "Ubud", country: "Indonesia", category: "Trending", rating: 4.94, reviewsCount: 78, reviews: [], owner: { username: "BaliVillaHost" }, geometry: { type: "Point", coordinates: [115.2625, -8.5069] }
    },
    {
        _id: "sample14",
        title: "Swiss Alpine Luxury Residence",
        description: "Breathtaking views of Matterhorn mountain with private sauna, heated fireplace, and ski-in ski-out access.",
        image: { url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 5200, location: "Zermatt", country: "Switzerland", category: "Trending", rating: 4.98, reviewsCount: 104, reviews: [], owner: { username: "AlpineHost" }, geometry: { type: "Point", coordinates: [7.7491, 46.0207] }
    },

    // --- Rooms (3 Stays) ---
    {
        _id: "sample11",
        title: "Boutique Heritage Master Bedroom Suite",
        description: "Elegant private suite with handcrafted mahogany furniture, marble bath, and daily artisan Parisian breakfast.",
        image: { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1250, location: "Paris", country: "France", category: "Rooms", rating: 4.87, reviewsCount: 29, reviews: [], owner: { username: "ParisHost" }, geometry: { type: "Point", coordinates: [2.3522, 48.8566] }
    },
    {
        _id: "sample15",
        title: "Modern Minimalist Room in Shibuya",
        description: "Cozy private room in trendy Shibuya neighborhood with high-speed fiber internet and complimentary matcha tea bar.",
        image: { url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 980, location: "Tokyo", country: "Japan", category: "Rooms", rating: 4.91, reviewsCount: 53, reviews: [], owner: { username: "TokyoHost" }, geometry: { type: "Point", coordinates: [139.7016, 35.658] }
    },
    {
        _id: "sample16",
        title: "Kensington Townhouse Garden Room",
        description: "Charming Victorian townhouse garden room with private ensuite bathroom and courtyard access.",
        image: { url: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1100, location: "London", country: "United Kingdom", category: "Rooms", rating: 4.85, reviewsCount: 36, reviews: [], owner: { username: "LondonHost" }, geometry: { type: "Point", coordinates: [-0.191, 51.4991] }
    },

    // --- Iconic Cities (4 Stays) ---
    {
        _id: "sample2",
        title: "Modern Loft in Downtown",
        description: "Stay in the heart of the city in this stylish and spacious penthouse loft near top restaurants and Broadway.",
        image: { url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1800, location: "New York", country: "United States", category: "Iconic Cities", rating: 4.88, reviewsCount: 32, reviews: [], owner: { username: "LoftHost" }, geometry: { type: "Point", coordinates: [-74.006, 40.7128] }
    },
    {
        _id: "sample17",
        title: "Venetian Palace Apartment on Grand Canal",
        description: "17th-century frescoed apartment overlooking the Grand Canal with private gondola dock.",
        image: { url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2400, location: "Venice", country: "Italy", category: "Iconic Cities", rating: 4.93, reviewsCount: 61, reviews: [], owner: { username: "VeniceHost" }, geometry: { type: "Point", coordinates: [12.3155, 45.4408] }
    },
    {
        _id: "sample18",
        title: "Dubai Marina Luxury Penthouse",
        description: "Ultra-modern skyscraper penthouse featuring private balcony pool and panoramic Marina skyline views.",
        image: { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 3600, location: "Dubai", country: "United Arab Emirates", category: "Iconic Cities", rating: 4.96, reviewsCount: 84, reviews: [], owner: { username: "DubaiHost" }, geometry: { type: "Point", coordinates: [55.1413, 25.0772] }
    },
    {
        _id: "sample19",
        title: "Barcelona Gothic Quarter Apartment",
        description: "Historic apartment with exposed wooden beams, sunlit balcony, and steps from Las Ramblas.",
        image: { url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1750, location: "Barcelona", country: "Spain", category: "Iconic Cities", rating: 4.89, reviewsCount: 45, reviews: [], owner: { username: "BarcaHost" }, geometry: { type: "Point", coordinates: [2.1734, 41.3851] }
    },

    // --- Mountains (3 Stays) ---
    {
        _id: "sample3",
        title: "Mountain Chalet & Spa",
        description: "Relax in this peaceful mountain chalet featuring panoramic alpine views, private hot tub, and wood fireplace.",
        image: { url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 3200, location: "Aspen", country: "United States", category: "Mountains", rating: 4.98, reviewsCount: 64, reviews: [], owner: { username: "ChaletHost" }, geometry: { type: "Point", coordinates: [-106.837, 39.1911] }
    },
    {
        _id: "sample20",
        title: "Banff National Park Timber Lodge",
        description: "Rustic timber lodge surrounded by snow-capped Canadian Rockies and glacial lakes.",
        image: { url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2900, location: "Banff", country: "Canada", category: "Mountains", rating: 4.95, reviewsCount: 71, reviews: [], owner: { username: "BanffHost" }, geometry: { type: "Point", coordinates: [-115.5708, 51.1784] }
    },
    {
        _id: "sample21",
        title: "Swiss Grindelwald Cliff Cabin",
        description: "Perched under the iconic Eiger North Face with floor-to-ceiling glass mountain vistas.",
        image: { url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 3400, location: "Grindelwald", country: "Switzerland", category: "Mountains", rating: 4.97, reviewsCount: 88, reviews: [], owner: { username: "EigerHost" }, geometry: { type: "Point", coordinates: [8.0414, 46.6242] }
    },

    // --- Castles (3 Stays) ---
    {
        _id: "sample4",
        title: "Historic Castle in Highlands",
        description: "Experience living like royalty in a restored 16th-century medieval castle with banquet halls and stone turrets.",
        image: { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 5000, location: "Highlands", country: "United Kingdom", category: "Castles", rating: 4.96, reviewsCount: 89, reviews: [], owner: { username: "CastleHost" }, geometry: { type: "Point", coordinates: [-4.2247, 57.4778] }
    },
    {
        _id: "sample22",
        title: "French Renaissance Loire Chateau",
        description: "Majestic French estate with manicured rose gardens, wine cellar, and private moat bridge.",
        image: { url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 4600, location: "Loire Valley", country: "France", category: "Castles", rating: 4.92, reviewsCount: 52, reviews: [], owner: { username: "ChateauHost" }, geometry: { type: "Point", coordinates: [0.6848, 47.3948] }
    },
    {
        _id: "sample23",
        title: "Rhine River Medieval Fortress",
        description: "Perched high above Germany's Rhine river valley with authentic gothic armor and wine tasting.",
        image: { url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 4100, location: "Bacharach", country: "Germany", category: "Castles", rating: 4.90, reviewsCount: 41, reviews: [], owner: { username: "RhineHost" }, geometry: { type: "Point", coordinates: [7.7681, 50.0594] }
    },

    // --- Camping & Glamping (3 Stays) ---
    {
        _id: "sample5",
        title: "Secluded Treehouse Retreat",
        description: "A magical treehouse sanctuary surrounded by lush tropical rainforest canopy and suspension bridges.",
        image: { url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1400, location: "Ubud", country: "Indonesia", category: "Camping", rating: 4.91, reviewsCount: 42, reviews: [], owner: { username: "TreehouseHost" }, geometry: { type: "Point", coordinates: [115.2625, -8.5069] }
    },
    {
        _id: "sample24",
        title: "Serengeti Luxury Glamping Safari Tent",
        description: "Five-star luxury safari tent with king bed, open-air shower, and direct wildlife viewing decks.",
        image: { url: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2600, location: "Serengeti", country: "Tanzania", category: "Camping", rating: 4.98, reviewsCount: 67, reviews: [], owner: { username: "SafariHost" }, geometry: { type: "Point", coordinates: [34.8333, -2.3333] }
    },
    {
        _id: "sample25",
        title: "Redwood Forest Eco Canopy Cabin",
        description: "Off-grid solar cabin nestled among ancient California Redwoods with private outdoor cedar tub.",
        image: { url: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1350, location: "Big Sur", country: "United States", category: "Camping", rating: 4.89, reviewsCount: 38, reviews: [], owner: { username: "RedwoodHost" }, geometry: { type: "Point", coordinates: [-121.8081, 36.2704] }
    },

    // --- Farms (3 Stays) ---
    {
        _id: "sample8",
        title: "Organic Farmstay & Vine Sanctuary",
        description: "Wake up to fresh farm breakfasts, homemade cheeses, and wine tasting among rolling olive groves.",
        image: { url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1600, location: "Tuscany", country: "Italy", category: "Farms", rating: 4.89, reviewsCount: 39, reviews: [], owner: { username: "TuscanyHost" }, geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
    },
    {
        _id: "sample26",
        title: "Napa Valley Vineyard Estate & Orchard",
        description: "Private vineyard estate with organic berry picking, wine cellar tour, and al fresco dining table.",
        image: { url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2800, location: "Napa Valley", country: "United States", category: "Farms", rating: 4.93, reviewsCount: 59, reviews: [], owner: { username: "NapaHost" }, geometry: { type: "Point", coordinates: [-122.2869, 38.2975] }
    },
    {
        _id: "sample27",
        title: "Cotswolds Pastoral Lavender Farm Cottage",
        description: "Picturesque English stone cottage surrounded by purple lavender fields and grazing sheep.",
        image: { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1700, location: "Cotswolds", country: "United Kingdom", category: "Farms", rating: 4.91, reviewsCount: 44, reviews: [], owner: { username: "CotswoldHost" }, geometry: { type: "Point", coordinates: [-1.8839, 51.833] }
    },

    // --- Amazing Pools (3 Stays) ---
    {
        _id: "sample6",
        title: "Luxury Oceanfront Resort Suite",
        description: "Private cliffside infinity pool with direct swim-up bar access and Caribbean ocean sunsets.",
        image: { url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 4200, location: "Cancun", country: "Mexico", category: "Amazing Pools", rating: 4.99, reviewsCount: 110, reviews: [], owner: { username: "ResortHost" }, geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
    },
    {
        _id: "sample28",
        title: "Maldives Overwater Bungalow & Glass Pool",
        description: "Stunning overwater villa with glass floor viewing portal and private lagoon infinity pool.",
        image: { url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 6500, location: "Male", country: "Maldives", category: "Amazing Pools", rating: 4.99, reviewsCount: 125, reviews: [], owner: { username: "MaldivesHost" }, geometry: { type: "Point", coordinates: [73.5093, 4.1755] }
    },
    {
        _id: "sample29",
        title: "Phuket Cliffside Glass Infinity Pool Villa",
        description: "Perched 100 meters above the Andaman Sea with 180-degree glass edge pool.",
        image: { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 4900, location: "Phuket", country: "Thailand", category: "Amazing Pools", rating: 4.96, reviewsCount: 82, reviews: [], owner: { username: "PhuketHost" }, geometry: { type: "Point", coordinates: [98.3923, 7.8804] }
    },

    // --- Arctic (3 Stays) ---
    {
        _id: "sample7",
        title: "Glass Igloo Under Northern Lights",
        description: "Watch the magical Aurora Borealis from your heated glass dome bedroom with reindeer safari included.",
        image: { url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 3800, location: "Rovaniemi", country: "Finland", category: "Artic", rating: 4.97, reviewsCount: 76, reviews: [], owner: { username: "AuroraHost" }, geometry: { type: "Point", coordinates: [25.7285, 66.5039] }
    },
    {
        _id: "sample30",
        title: "Tromso Fjords Northern Lights Chalet",
        description: "Cozy polar chalet featuring private sauna, outdoor hot tub, and fjord snowmobile tours.",
        image: { url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 3300, location: "Tromso", country: "Norway", category: "Artic", rating: 4.94, reviewsCount: 58, reviews: [], owner: { username: "TromsoHost" }, geometry: { type: "Point", coordinates: [18.9553, 69.6492] }
    },
    {
        _id: "sample31",
        title: "Lapland Sculpted Ice & Snow Hotel Suite",
        description: "Hand-carved ice bedroom suite kept at -5°C with thermal arctic sleeping gear provided.",
        image: { url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2900, location: "Jukkasjarvi", country: "Sweden", category: "Artic", rating: 4.91, reviewsCount: 43, reviews: [], owner: { username: "IceHost" }, geometry: { type: "Point", coordinates: [20.5961, 67.8522] }
    },

    // --- Domes (3 Stays) ---
    {
        _id: "sample9",
        title: "Futuristic Stargazing Geodesic Dome",
        description: "Zero-light-pollution desert dome with professional Meade telescope, fire pit, and star deck.",
        image: { url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2100, location: "Joshua Tree", country: "United States", category: "Domes", rating: 4.94, reviewsCount: 55, reviews: [], owner: { username: "DomeHost" }, geometry: { type: "Point", coordinates: [-116.3131, 34.1347] }
    },
    {
        _id: "sample32",
        title: "Sedona Red Rock Geodesic Sanctuary",
        description: "Eco dome nestled between majestic red rock vortexes with private hot tub and outdoor deck.",
        image: { url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2300, location: "Sedona", country: "United States", category: "Domes", rating: 4.92, reviewsCount: 49, reviews: [], owner: { username: "SedonaHost" }, geometry: { type: "Point", coordinates: [-111.761, 34.8697] }
    },
    {
        _id: "sample33",
        title: "Patagonia Mountain View Eco-Dome",
        description: "Glacier-view geodesic dome surrounded by Torres del Paine mountain wilderness.",
        image: { url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2750, location: "Patagonia", country: "Chile", category: "Domes", rating: 4.96, reviewsCount: 62, reviews: [], owner: { username: "PatagoniaHost" }, geometry: { type: "Point", coordinates: [-72.8829, -51.2532] }
    },

    // --- Boats (3 Stays) ---
    {
        _id: "sample10",
        title: "Classic Vintage Wooden Houseboat",
        description: "Docked in scenic canals with rooftop sun terrace, fully equipped kitchen, and paddleboards included.",
        image: { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 1950, location: "Amsterdam", country: "Netherlands", category: "Boats", rating: 4.90, reviewsCount: 47, reviews: [], owner: { username: "CanalHost" }, geometry: { type: "Point", coordinates: [4.9041, 52.3676] }
    },
    {
        _id: "sample34",
        title: "Kerala Backwaters Luxury Kettuvallam Yacht",
        description: "Traditional teak houseboat cruising through palm-fringed backwaters with private chef on board.",
        image: { url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 2200, location: "Alleppey", country: "India", category: "Boats", rating: 4.93, reviewsCount: 54, reviews: [], owner: { username: "KeralaHost" }, geometry: { type: "Point", coordinates: [76.3388, 9.4981] }
    },
    {
        _id: "sample35",
        title: "Santorini Sunset Sailing Catamaran Stay",
        description: "Luxury 50ft catamaran anchored in Aegean bay with snorkeling gear and sunset dinners included.",
        image: { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", filename: "listingimage" },
        price: 3900, location: "Santorini", country: "Greece", category: "Boats", rating: 4.97, reviewsCount: 81, reviews: [], owner: { username: "SailingHost" }, geometry: { type: "Point", coordinates: [25.4317, 36.3932] }
    }
];

module.exports.index = async (req, res) => {
    try {
        const { search, category } = req.query;
        let allListings = [];

        // Check if Mongoose is connected (readyState === 1)
        if (mongoose.connection && mongoose.connection.readyState === 1) {
            let queryObj = {};
            if (search) {
                const regex = new RegExp(search, "i");
                queryObj = {
                    $or: [
                        { title: regex },
                        { location: regex },
                        { country: regex }
                    ]
                };
            }

            // Race MongoDB query against a 500ms fast timeout
            const dbPromise = Listing.find(queryObj).exec();
            const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 500));
            const dbListings = await Promise.race([dbPromise, timeoutPromise]);

            if (dbListings && dbListings.length > 0) {
                allListings = dbListings;
            }
        }

        // Fallback to high-performance pre-seeded listings if DB is disconnected or slow
        if (!allListings || allListings.length === 0) {
            allListings = sampleListings;
        }

        // Apply fast in-memory search and category filtering
        if (search) {
            const s = search.toLowerCase();
            allListings = allListings.filter(l =>
                (l.title && l.title.toLowerCase().includes(s)) ||
                (l.location && l.location.toLowerCase().includes(s)) ||
                (l.country && l.country.toLowerCase().includes(s))
            );
        }

        if (category && category !== "all") {
            const catLower = category.toLowerCase();
            allListings = allListings.filter(l =>
                l.category && l.category.toLowerCase() === catLower
            );
        }

        res.render("listings/index.ejs", { allListings, search: search || '', selectedCategory: category || '' });
    } catch (err) {
        res.render("listings/index.ejs", { allListings: sampleListings, search: '', selectedCategory: '' });
    }
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing;
    if (id && id.startsWith("sample")) {
        listing = sampleListings.find(s => s._id === id);
    } else {
        try {
            listing = await Listing.findById(id)
                .populate({
                    path: "reviews",
                    populate: {
                        path: "author"
                    }
                })
                .populate("owner");
        } catch (e) {
            listing = null;
        }
    }
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
        return;
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    console.log(response.body.features[0].geometry);
    
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};