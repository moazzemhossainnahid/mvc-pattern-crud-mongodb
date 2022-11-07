const { getDb } = require("../Utils/connectToServer");

const products = [
    { id: 1, name: "Nahid" },
    { id: 2, name: "Ashiq" },
    { id: 3, name: "Jahid" },
]

module.exports.getAllProducts = async (req, res, next) => {
    try {
        const db = getDb();
        // cursor => toArray(), forEach()
        const products = await db.collection("products").find().toArray();
        res.status(200).json({success: true, data: products})

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
    const { id } = req.params;
    console.log(id);
    // const foundProduct = products.find(product => product.id == id);
    const foundProduct = products.find(product => product.id === Number(id));
    res.send(foundProduct);
}

// Patch
module.exports.UpdateTool = (req, res) => {
    // const newData = req.body;
    const { id } = req.params;
    const filter = { _id: id };
    const newData = products.find(project => project.id === Number(id));
    newData.id = id;
    newData.name = req.body.name;
    res.send(newData);

}
// Delete
module.exports.DeleteTool = (req, res) => {
    // const newData = req.body;
    const { id } = req.params;
    const filter = { _id: id };
    const newData = products.filter(project => project.id !== Number(id));
    res.send(newData);

}