const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
//const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const sampleListings = [
    {
        _id: "sample1",
        title: "Cozy Beachfront Villa",
        description: "Escape to this beautiful beachfront villa with stunning ocean views and private beach access.",
        image: {
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 2500,
        location: "Malibu",
        country: "United States",
        category: "Trending",
        rating: 4.95,
        reviewsCount: 48,
        reviews: [],
        owner: { username: "VillaHost" },
        geometry: { type: "Point", coordinates: [-118.7798, 34.0259] }
    },
    {
        _id: "sample2",
        title: "Modern Loft in Downtown",
        description: "Stay in the heart of the city in this stylish and spacious loft near top restaurants.",
        image: {
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 1800,
        location: "New York",
        country: "United States",
        category: "Iconic Cities",
        rating: 4.88,
        reviewsCount: 32,
        reviews: [],
        owner: { username: "LoftHost" },
        geometry: { type: "Point", coordinates: [-74.006, 40.7128] }
    },
    {
        _id: "sample3",
        title: "Mountain Chalet & Spa",
        description: "Relax in this peaceful mountain chalet featuring panoramic alpine views and private hot tub.",
        image: {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 3200,
        location: "Aspen",
        country: "United States",
        category: "Mountains",
        rating: 4.98,
        reviewsCount: 64,
        reviews: [],
        owner: { username: "ChaletHost" },
        geometry: { type: "Point", coordinates: [-106.837, 39.1911] }
    },
    {
        _id: "sample4",
        title: "Historic Castle in Highlands",
        description: "Experience living like royalty in a restored 16th-century medieval castle.",
        image: {
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 5000,
        location: "Highlands",
        country: "United Kingdom",
        category: "Castles",
        rating: 4.96,
        reviewsCount: 89,
        reviews: [],
        owner: { username: "CastleHost" },
        geometry: { type: "Point", coordinates: [-4.2247, 57.4778] }
    },
    {
        _id: "sample5",
        title: "Secluded Treehouse Retreat",
        description: "A magical treehouse sanctuary surrounded by lush tropical rainforest canopy.",
        image: {
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 1400,
        location: "Ubud",
        country: "Indonesia",
        category: "Camping",
        rating: 4.91,
        reviewsCount: 42,
        reviews: [],
        owner: { username: "TreehouseHost" },
        geometry: { type: "Point", coordinates: [115.2625, -8.5069] }
    },
    {
        _id: "sample6",
        title: "Luxury Oceanfront Resort Suite",
        description: "Private infinity pool with direct access to crystal clear turquoise ocean waters.",
        image: {
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 4200,
        location: "Cancun",
        country: "Mexico",
        category: "Amazing Pools",
        rating: 4.99,
        reviewsCount: 110,
        reviews: [],
        owner: { username: "ResortHost" },
        geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
    },
    {
        _id: "sample7",
        title: "Glass Igloo Under Northern Lights",
        description: "Watch the magical Aurora Borealis from your heated glass dome bedroom.",
        image: {
            url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 3800,
        location: "Rovaniemi",
        country: "Finland",
        category: "Artic",
        rating: 4.97,
        reviewsCount: 76,
        reviews: [],
        owner: { username: "AuroraHost" },
        geometry: { type: "Point", coordinates: [25.7285, 66.5039] }
    },
    {
        _id: "sample8",
        title: "Organic Farmstay & Vine Sanctuary",
        description: "Wake up to fresh farm breakfasts and wine tasting among rolling olive groves.",
        image: {
            url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 1600,
        location: "Tuscany",
        country: "Italy",
        category: "Farms",
        rating: 4.89,
        reviewsCount: 39,
        reviews: [],
        owner: { username: "TuscanyHost" },
        geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
    },
    {
        _id: "sample9",
        title: "Futuristic Stargazing Geodesic Dome",
        description: "Zero-light-pollution desert dome with professional telescope and star deck.",
        image: {
            url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 2100,
        location: "Joshua Tree",
        country: "United States",
        category: "Domes",
        rating: 4.94,
        reviewsCount: 55,
        reviews: [],
        owner: { username: "DomeHost" },
        geometry: { type: "Point", coordinates: [-116.3131, 34.1347] }
    },
    {
        _id: "sample10",
        title: "Classic Vintage Wooden Houseboat",
        description: "Docked in scenic canals with rooftop sun terrace and paddleboards included.",
        image: {
            url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 1950,
        location: "Amsterdam",
        country: "Netherlands",
        category: "Boats",
        rating: 4.90,
        reviewsCount: 47,
        reviews: [],
        owner: { username: "CanalHost" },
        geometry: { type: "Point", coordinates: [4.9041, 52.3676] }
    },
    {
        _id: "sample11",
        title: "Boutique Heritage Master Bedroom Suite",
        description: "Elegant private suite with handcrafted mahogany furniture and artisan breakfast.",
        image: {
            url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 1250,
        location: "Paris",
        country: "France",
        category: "Rooms",
        rating: 4.87,
        reviewsCount: 29,
        reviews: [],
        owner: { username: "ParisHost" },
        geometry: { type: "Point", coordinates: [2.3522, 48.8566] }
    },
    {
        _id: "sample12",
        title: "Cliffside Sunset Villa with Infinity Pool",
        description: "Perched over the Aegean sea featuring iconic whitewashed architecture.",
        image: {
            url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            filename: "listingimage"
        },
        price: 4800,
        location: "Santorini",
        country: "Greece",
        category: "Trending",
        rating: 4.97,
        reviewsCount: 92,
        reviews: [],
        owner: { username: "SantoriniHost" },
        geometry: { type: "Point", coordinates: [25.4317, 36.3932] }
    }
];

module.exports.index = async (req, res) => {
    try {
        const { search, category } = req.query;
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

        let allListings = await Listing.find(queryObj);
        if (!allListings || allListings.length === 0) {
            allListings = sampleListings;
        }

        // Apply in-memory search and category filter for sampleListings fallback
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