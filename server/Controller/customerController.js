const Customer = require('../models/customerModel')

const Homepage = async (req, res) => {
    try {
        const message = req.flash('info');
        // const DisplayList = await Customer.find({}).limit(20);
        const locals = {
            title: "NodeJs",
            description: "EJS Project Practice"
        };

        let perPage = 10;
        let page = parseInt(req.query.page) || 1;

        const customers = await Customer.aggregate([
            { $sort: { updatedAt: -1 } }
        ])
            .skip(perPage * (page - 1))
            .limit(perPage)
            .exec();

        const count = await Customer.countDocuments();

        res.render('index', {
            locals,
            message,
            customers,
            current: page,
            pages: Math.ceil(count / perPage)
        });
    } catch (error) {
        console.log("err", error);
    }
};


const addCustomer = async (req, res) => {
    try {
        const locals = {
            title: "Add New Customer",
            description: "EJS Project Practice"
        }
        res.render('customer/add', locals)
    } catch (error) {
        console.log("err", error);
    }

}


const PostaddCustomer = async (req, res) => {
    try {

        const { firstName, lastName, details, tel, email } = req.body;

        await Customer.create({
            firstName, lastName, email, tel, details
        });
        await req.flash('info', 'new customer has been added')
        res.redirect('/')
    } catch (error) {
        console.log("err", error);
    }

}

const ViewCustomers = async (req, res) => {
    try {

        const customer = await Customer.findOne({ _id: req.params.id })
        const locals = {
            title: "Customer details",
            description: "EJS Project Practice"
        }
        res.render('customer/view', { locals, customer })
    } catch (error) {
        console.log(error);
    }
}


const EditCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id })
        const locals = {
            title: "Edit Customer details",
            description: "EJS Project Practice"
        }
        res.render('customer/edit', { locals, customer })
    } catch (error) {
        console.log(error);
    }
}



const EditCustomerDetails = async (req, res) => {
    try {
        const { firstName, lastName, details, tel, email } = req.body;

        await Customer.findOneAndUpdate({
            firstName, lastName, email, tel, details
        }).where(req.params.id)

        // res.redirect(`/edit/${req.params.id}`)
        await req.flash('info', 'customer has been Updated')
        res.redirect('/')

    } catch (error) {
        console.log(error);
    }
}

const DeleteCustomer = async (req, res) => {
    try {
        await Customer.findOneAndDelete({ _id: req.params.id })
        await req.flash('info', `Customer is has been deleted successfully`)
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}



const SearchCustomer = async (req, res) => {
    const locals = {
        title: "Search Customer details",
        description: "EJS Project Practice"
    }
    try {
        let searchTerm = req.body.searchTerm;
        const SearchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const customer = await Customer.find({
            $or: [
                { firstName: { $regex: new RegExp(SearchNoSpecialChar, "i") } },
                { lastName: { $regex: new RegExp(SearchNoSpecialChar, "i") } }
            ]
        });
        res.render('search', {
            customer,
            locals
        })

    } catch (error) {
        console.log(error);
    }
}


module.exports = { Homepage, addCustomer, PostaddCustomer, ViewCustomers, EditCustomer, EditCustomerDetails, DeleteCustomer, SearchCustomer }