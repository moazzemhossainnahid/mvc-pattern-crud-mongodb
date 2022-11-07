const { ObjectId } = require("mongodb");
const { getDb } = require("../Utils/connectToServer");

const products = [
    { id: 1, name: "Nahid" },
    { id: 2, name: "Ashiq" },
    { id: 3, name: "Jahid" },
]

module.exports.getAllProducts = async (req, res, next) => {
    try {
        const { limit, page } = req.query;
        const db = getDb();
        // cursor => toArray(), forEach()
        const products = await db.collection("products").find({}).project({ _id: 0 }).skip(+page * limit).limit(+limit).toArray();
        res.status(200).json({ success: true, data: products })

    } catch (error) {
        next(error);
    };
};

// module.exports.getAllProducts = (req, res, next) => {
//     const { limit, page } = req.query;
//     console.log(limit, page);
//     res.json(products.slice(0, limit));
// };

// // Another way to Export Function
// module.exports.SaveAProducts = (req, res) => {
//     res.send("Product Added");
// };


// Another way to Export Function
// module.exports.SaveAProducts = (req, res) => {
//     console.log(req.body);
//     products.push(req.body);
//     res.send(products);
//     res.status(200).send({
//         success: true,
//         messages: "Success",
//         data: foundTool
//     });
//     res.status(500).send({
//         success: false,
//         messages: "Internal Server Error"
//     });
// };


// Another way to Export Function
module.exports.SaveAProducts = async (req, res, next) => {
    try {
        const db = getDb();
        const product = req.body;
        const result = await db.collection("users").insertOne(req.body);
        console.log(result);

        if (!result.insertedId) {
            return (res.status(400).send({ status: false, error: "Something Went Wrong!" }))
        };

        res.send({ success: true, message: `Product Added with ID: ${result.insertedId}` });

    } catch (error) {
        next(error);
    };
};

// module.exports.getProductDetails = async (req, res, next) => {
//     const {id, test} = req.params;
//     console.log(id, test);
//     res.send("Get Tools Details");
// }

module.exports.getProductDetails = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Not a Valid Products ID." });
        };
        const product = await db.collection("products").findOne({ _id: ObjectId(id) });
        if (!product) {
            return res.status(400).json({ success: false, error: "Could Not find a Product with this ID." });
        };
        res.status(200).json({ success: true, data: products });

    } catch (error) {
        next(error);
    };
};

// Patch
module.exports.UpdateTool = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Not a Valid Products ID." });
        };
        const product = await db.collection("products").updateOne({ _id: ObjectId(id) }, { $set: req.body });
        if (!product.updatedCount) {
            return res.status(400).json({ success: false, error: "Could Not find a Product with this ID." });
        };
        res.status(200).json({ success: true,  message: "Successfully Updated the Product." });

    } catch (error) {
        next(error);
    };
};
// Delete
module.exports.DeleteTool = async (req, res, next) => {
    try {
        const db = getDb();
        const { id } = req.params;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Not a Valid Products ID." });
        };
        const product = await db.collection("products").deleteOne({ _id: ObjectId(id) }, { $set: req.body });
        if (!product.deletedCount) {
            return res.status(400).json({ success: false, error: "Could Not find a Product with this ID." });
        };
        res.status(200).json({ success: true, message: "Successfully Deleted the Product." });

    } catch (error) {
        next(error);
    };

}