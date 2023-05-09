import utility from "./utility";

const responseCode: any = {
    // General error code
    'GEN0000': {
        code: 'GEN0000',
        msg: ""
    },
    'GEN0001': {
        code: 'GEN0001',
        msg: "Invalid API call"
    },
    'GEN0002': {
        code: 'GEN0002',
        msg: "Invalid or unauthorised user"
    },
    'GEN0003': {
        code: 'GEN0003',
        msg: 'Validation error'
    },
    'GEN0004': {
        code: 'GEN0004',
        msg: 'Something went wrong'
    },
    'GEN0005': {
        code: 'GEN0005',
        msg: 'Unauthorised access'
    },
    'GEN0006': {
        code: 'GEN0006',
        msg: 'Data updated successfully'
    },
    'GEN0007': {
        code: 'GEN0007',
        msg: 'Action failed'
    },
    'GEN0008': {
        code: 'GEN0008',
        msg: 'List of data displayed successfully'
    },
    'GEN0009': {
        code: 'GEN0009',
        msg: 'Record not found'
    },
    'GEN0010': {
        code: 'GEN0010',
        msg: 'Error Occurred While Uploading Image'
    },
    'GEN0011': {
        code: 'GEN0011',
        msg: 'Activity log display Successfully'
    },
    'GEN0012': {
        code: 'GEN0012',
        msg: 'Data not found.'
    },


    // validation error code
    'VAL0001': {
        code: 'VAL0001',
        msg: 'Email already in use'
    },
    'VAL0002': {
        code: 'VAL0002',
        msg: 'Current and New Password should not be same'
    },
    'VAL0003': {
        code: 'VAL0003',
        msg: 'New and Confirm Password should be same'
    },
    'VAL0004': {
        code: 'VAL0004',
        msg: 'Invalid user'
    },
    'VAL0005': {
        code: 'VAL0005',
        msg: 'Invalid current password'
    },
    'VAL0006': {
        code: 'VAL0006',
        msg: 'User profile is not activated'
    },
    'VAL0007': {
        code: 'VAL0007',
        msg: 'Invalid food category'
    },
    'VAL0008': {
        code: 'VAL0008',
        msg: 'Invalid source id'
    },
    'VAL0009': {
        code: 'VAL0009',
        msg: 'This product name already in use'
    },
    'VAL0010': {
        code: 'VAL0010',
        msg: 'Current password & New password should not be same.'
    },
    'VAL0011': {
        code: 'VAL0011',
        msg: 'Invalid Product Additive Replacement'
    },


    // auth error code
    'AUTH0001': {
        code: 'AUTH0001',
        msg: 'User created successfully'
    },
    'AUTH0002': {
        code: 'AUTH0002',
        msg: 'Failed to create user'
    },
    'AUTH0003': {
        code: 'AUTH0003',
        msg: 'Invalid role id'
    },
    'AUTH0004': {
        code: 'AUTH0004',
        msg: 'Role already assigned to this user'
    },
    'AUTH0005': {
        code: 'AUTH0005',
        msg: 'Invalid login id'
    },
    'AUTH0006': {
        code: 'AUTH0006',
        msg: 'Invalid password'
    },
    'AUTH0007': {
        code: 'AUTH0007',
        msg: 'Login successfully'
    },
    'AUTH0008': {
        code: 'AUTH0008',
        msg: 'Invalid Email id'
    },
    'AUTH0009': {
        code: 'AUTH0009',
        msg: 'Password updated successfully'
    },
    'AUTH0010': {
        code: 'AUTH0010',
        msg: 'Profile updated successfully'
    },
    'AUTH0011': {
        code: 'AUTH0011',
        msg: 'Status updated successfully'
    },
    'AUTH0012': {
        code: 'AUTH0012',
        msg: 'User deleted successfully'
    },
    'AUTH0013': {
        code: 'AUTH0013',
        msg: 'Got user detail successfully'
    },
    'AUTH0014': {
        code: 'AUTH0014',
        msg: 'Get user list successfully'
    },
    'AUTH0015': {
        code: 'AUTH0015',
        msg: 'Token verified successfully'
    },
    'AUTH0016': {
        code: 'AUTH0016',
        msg: 'OTP sent successfully'
    },
    'AUTH0017': {
        code: 'AUTH0017',
        msg: 'Invalid/Expired Token'
    },
    'AUTH0018': {
        code: 'AUTH0018',
        msg: 'Error occurred while generating OTP'
    },
    'AUTH0019': {
        code: 'AUTH0019',
        msg: 'Email sent successfully'
    },
    'AUTH0020': {
        code: 'AUTH0020',
        msg: 'Deatils saved successfully'
    },
    'AUTH0021': {
        code: 'AUTH0021',
        msg: 'Logout successfully'
    },
    'AUTH0022': {
        code: 'AUTH0022',
        msg: 'No active session found'
    },
    'AUTH0023': {
        code: 'AUTH0023',
        msg: 'terms and condition acceptance is necessary to checkout'
    },
    'AUTH0024': {
        code: 'AUTH0024',
        msg: 'terms and condition acceptance is necessary to sign up'
    },


    'USER0001': {
        code: 'USER0001',
        msg: 'user roles count display successfully'
    },
    'USER0002': {
        code: 'USER0002',
        msg: 'Filters list display Successfully'
    },
    'USER0003': {
        code: 'USER0003',
        msg: 'Roles list display Successfully'
    },
    'USER0004': {
        code: 'USER0004',
        msg: 'Users list display Successfully'
    },
    'USER0005': {
        code: 'USER0005',
        msg: 'Users status updated Successfully'
    },
    'USER0006': {
        code: 'USER0006',
        msg: 'Users is not exist'
    },
    'USER0007': {
        code: 'USER0007',
        msg: 'User already exist'
    },
    'USER0008': {
        code: 'USER0008',
        msg: 'User Profile image updated successfully'
    },
    'USER0009': {
        code: 'USER0009',
        msg: 'User not found'
    },
    'USER0010': {
        code: 'USER0010',
        msg: 'User Profile updated successfully'
    },
    'USER0011': {
        code: 'USER0011',
        msg: 'User detail fetched successfully'
    },

    'FORM0001': {
        code: 'FORM0001',
        msg: 'User details added successfully'
    },
    'FORM0002': {
        code: 'FORM0002',
        msg: 'NDA form sent to user email'
    },
    'FORM0003': {
        code: 'FORM0003',
        msg: 'You can login with the credientals we have sent you in email until you have not update them.'
    },
    'FORM0004': {
        code: 'FORM0004',
        msg: 'Glance details deleted successfully'
    },
    'FORM0005': {
        code: 'FORM0005',
        msg: 'Form with this id does not exist'
    },
    'FORM0006': {
        code: 'FORM0006',
        msg: 'Customers list display successfully'
    },
    'FORM0007': {
        code: 'FORM0007',
        msg: 'NDA requests list display successfully'
    },
    'FORM0008': {
        code: 'FORM0008',
        msg: 'Rejeacted NDA request'
    },

    //Ingredients error code
    'INGREDIENT0001': {
        code: 'INGREDIENT0001',
        msg: 'Ingredient details saved successfully'
    },
    'INGREDIENT0002': {
        code: 'INGREDIENT0002',
        msg: 'You already have ingredient with this name'
    },
    'INGREDIENT0003': {
        code: 'INGREDIENT0003',
        msg: 'Ingredients list display successfully'
    },
    'INGREDIENT0004': {
        code: 'INGREDIENT0004',
        msg: 'Ingredient details fetched successfully'
    },
    'INGREDIENT0005': {
        code: 'INGREDIENT0005',
        msg: 'Ingredient not found!'
    },
    'INGREDIENT0006': {
        code: 'INGREDIENT0006',
        msg: 'Ingredient details updated successfully'
    },
    'INGREDIENT0007': {
        code: 'INGREDIENT0007',
        msg: 'Ingredient deleted successfully'
    },
    'INGREDIENT0008': {
        code: 'INGREDIENT0008',
        msg: 'Ingredient categories list display successfully'
    },
    'INGREDIENT0009': {
        code: 'INGREDIENT0009',
        msg: 'Ingredient nutrients list display successfully'
    },
    'INGREDIENT0010': {
        code: 'INGREDIENT00010',
        msg: 'Files saved for Ingredient successfully'
    },
    'INGREDIENT0011': {
        code: 'INGREDIENT00011',
        msg: 'Default image updated successfully'
    },
    'INGREDIENT0012': {
        code: 'INGREDIENT0012',
        msg: 'Ingredient types list display successfully'
    },
    'INGREDIENT0013': {
        code: 'INGREDIENT0013',
        msg: 'Ingredient Image deleted successfully'
    },
    'INGREDIENT0014': {
        code: 'INGREDIENT0014',
        msg: 'No Image/video selected'
    },
    'INGREDIENT0015': {
        code: 'INGREDIENT0015',
        msg: 'No media found with this ingredient Id'
    },
    'INGREDIENT0016': {
        code: 'INGREDIENT0016',
        msg: 'Upload at least 1 file'
    },
    'INGREDIENT0017': {
        code: 'INGREDIENT0017',
        msg: 'Maximum files limit reached'
    },
    'INGREDIENT0018': {
        code: 'INGREDIENT0018',
        msg: 'Error occurred while uploading file'
    },

    'CART0001': {
        code: 'CART0001',
        msg: 'Added to cart successfully'
    },
    'CART0002': {
        code: 'CART0002',
        msg: 'You already have Cart with your userId'
    },
    'CART0003': {
        code: 'CART0003',
        msg: 'Invalid price Id'
    },
    'CART0004': {
        code: 'CART0004',
        msg: 'Invalid price or ingrdient Id'
    },
    'CART0005': {
        code: 'CART0004',
        msg: 'Valid price and ingrdient Id'
    },
    'CART0006': {
        code: 'CART0006',
        msg: 'Cart do not exist with this userId'
    },
    'CART0007': {
        code: 'CART0007',
        msg: 'Cart details fetched successfully'
    },
    'CART0008': {
        code: 'CART0008',
        msg: 'Item deleted from cart successfully'
    },
    'CART0009': {
        code: 'CART0009',
        msg: 'Invalid cart item id'
    },
    'CART00010': {
        code: 'CART00010',
        msg: 'Quantity updated succesfully for this cart item'
    },
    'CART00011': {
        code: 'CART00011',
        msg: 'Cart deleted successfully'
    },
    'CART00012': {
        code: 'CART00012',
        msg: 'Cart is already empty'
    },

    'ORDER0001': {
        code: 'ORDER0001',
        msg: 'Order created successfully'
    },
    'ORDER0002': {
        code: 'ORDER0002',
        msg: ' No order placed with this userId'
    },
    'ORDER0003': {
        code: 'ORDER0003',
        msg: 'Order details fetched successfully'
    },
    'ORDER0004': {
        code: 'ORDER0004',
        msg: 'No order found'
    },
    'ORDER0005': {
        code: 'ORDER0005',
        msg: 'Failed to create order'
    },
    'ORDER0006': {
        code: 'ORDER0006',
        msg: 'Order status updated successfully'
    },
    'ORDER0007': {
        code: 'ORDER0007',
        msg: 'Checkout session fetched successfully'
    },

    'CUSTOMER0001': {
        code: 'CUSTOMER0001',
        msg: 'Customer details saved successfully'
    },
    'CUSTOMER0002': {
        code: 'CUSTOMER0002',
        msg: 'You already have customer with this email'
    },
    'CUSTOMER0003': {
        code: 'CUSTOMER0003',
        msg: 'Customer list display successfully'
    },
    'CUSTOMER0004': {
        code: 'CUSTOMER0004',
        msg: 'Customer details fetched successfully'
    },
    'CUSTOMER0005': {
        code: 'CUSTOMER0005',
        msg: 'Customer not found!'
    },
    'CUSTOMER0006': {
        code: 'CUSTOMER0006',
        msg: 'Customer details updated successfully'
    },
    'CUSTOMER0007': {
        code: 'CUSTOMER0007',
        msg: 'Customer deleted successfully'
    },
  
}

// add below code for maintain response message formatting
let unFormatSet = []

for (let index in responseCode) {
    if (unFormatSet.includes(index))
        responseCode[index].msg = utility.titleCase(responseCode[index].msg);
}

export default responseCode;

