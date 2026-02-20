const { User } = require("../models/user.model");

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "please fill all the details"});
    }

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({message: "user not found"});
        }

        if(password !== user.password) {
            return res.status(400).json({message: "invalid password"});
        }

        return res.status(200).json({message: "Login successful", user});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const signup = async(req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    if(!name || !email || !phoneNumber || !password ) {
        return res.status(400).json({message: "please fill all the details"});
    }

    try {
        const existingEmail = await User.findOne({ email });

        if(existingEmail) {
            return res.status(400).json({message: "Email already exist"});
        }

        const existingNumber = await User.findOne({ phoneNumber });

        if(existingNumber) {
            return res.status(400).json({message: "Phone number already exists"});
        }

        const user = new User({ name, email, phoneNumber, password });
        const savedUser = await user.save();

        if(!savedUser) {
            return res.status(400).json({message: "Unable to save user"});
        }

        return res.status(200).json({message: "Account created", user});
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

const addForm = async (req, res) => {
    const { id } = req.params;
    const form = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $push: {
                forms: form
            }
        }, {new: true});

        return res.status(200).json({ message: "Form created successfully", user: updatedUser });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const getForms = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id)

        if(!user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        return res.status(200).json({ forms: user.forms });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const deleteForm = async (req, res) => {
    const { id, index } = req.params; 

    try {
        const user = await User.findById(id);

        if(!user) {
            return res.status(400).json({ message: "user not found" });
        }

        user.forms.splice(index, 1);

        await user.save();

        return res.status(200).json({ message: "Form deleted successfully", forms: user.forms});
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

const getFormDetails = async (req, res) => {
    const { id, index } = req.params;

    try {
        const user = await User.findById(id);

        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const form = user.forms[Number(index)];

        return res.status(200).json({ form });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = { login, signup, addForm, getForms, deleteForm, getFormDetails };