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
        reviews: [],
        owner: { username: "ResortHost" },
        geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
    }
];

module.exports.index = async (req, res) => {
    try {
        let allListings = await Listing.find({});
        if (!allListings || allListings.length === 0) {
            allListings = sampleListings;
        }
        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        res.render("listings/index.ejs", { allListings: sampleListings });
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