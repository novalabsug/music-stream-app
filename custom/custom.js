module.exports.fetchAdmin = async(email, User) => {
    const admin = await User.fetch_user(email);
    let adminId = "";

    if (admin) {
        adminId = admin._id;
    }

    if (adminId !== "") {
        return adminId;
    }
}

module.exports.checkCompany = async(email, Company, User) => {
    let result = false;
    // first fetch user id
    const user = await User.fetch_user(email);

    // fetch all companies and compare user id with admin id
    const companies = await Company.fetch_companies();

    if (companies.length) {
        companies.forEach(company => {
            if (company.admins.admin.toString() == user._id.toString()) {
                result = true;
            }
        });
    } else {
        result = false;
    }

    return result;
}

module.exports.verifyUserEmail = async(email, req, jwt, User) => {
    const token = req.cookies.etickets_JWT;
    const TRUE = true;
    const FALSE = false;
    var result = '';

    // check if token exists and is valid
    if (token) {
        result = await jwt.verify(token, 'etickets novalabs token', async(err, decodedToken) => {
            if (err) {
                return FALSE;
            } else {
                let user = await User.findById(decodedToken.id);
                if (user.email.toString() == email.toString()) {
                    return TRUE;
                } else {
                    return FALSE;
                }
            }
        });
    } else {
        result = FALSE;
    }
    return result;
}

module.exports.checkDate = async(date, filterType) => {
    let Today = new Date();
    let newDate = new Date(date);
    let result = false;

    switch (filterType) {
        case 'today':
            if (newDate.getFullYear() === Today.getFullYear() && newDate.getMonth() === Today.getMonth() && newDate.getDate() === Today.getDate() && newDate.getDay() === Today.getDay()) {
                result = true;
            } else {
                result = false;
            }

            break;
        case 'thisWeek':
            if (newDate.getFullYear() === Today.getFullYear() && newDate.getMonth() === Today.getMonth() && newDate.getDate() > Today.getDate()) {
                if(newDate.getDate() < Today.getDate() + 7) {
                    result = true;
                }
            } else {
                result = false;
            }

            break;
        case 'thisMonth':
            if (newDate.getFullYear() === Today.getFullYear() && newDate.getMonth() === Today.getMonth()) {
                result = true;
            } else {
                result = false;
            }

            break;
    
        default:
            break;
    }

    // first check if the movie date has passed
    
    return result;
}