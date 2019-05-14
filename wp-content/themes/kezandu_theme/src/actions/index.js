import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const SEARCH_POSTS = 'SEARCH_POSTS';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
export const FETCH_CAT_INFO = 'FETCH_CAT_INFO';
export const FETCH_TAG_INFO = 'FETCH_TAG_INFO';
export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FETCH_ACF = 'FETCH_ACF';
export const FETCH_ENTRY_BOX = 'FETCH_ENTRY_BOX';
export const FETCH_ENTRY_DATA_ITEM = 'FETCH_ENTRY_DATA_ITEM';
export const FETCH_FAQ = 'FETCH_FAQ';
export const FETCH_REWARDS = 'FETCH_REWARDS';
export const FETCH_LOGIN = 'FETCH_LOGIN';
export const FETCH_CUSTOMER = 'FETCH_CUSTOMER';
export const FETCH_CUSTOMER_REGISTER = 'FETCH_CUSTOMER_REGISTER';
export const FETCH_CUSTOMER_LOGOUT = 'FETCH_CUSTOMER_LOGOUT';
export const FETCH_LOST_PASSWORD = 'FETCH_LOST_PASSWORD';
export const FETCH_CHANGE_PASSWORD = 'FETCH_CHANGE_PASSWORD';
export const ROUTER = 'ROUTER';
export const SELECTED_ENTRY = 'SELECTED_ENTRY';
export const EXP_PAGE_ID = 'EXP_PAGE_ID';
export const FETCH_TOKEN = 'FETCH_TOKEN';
export const FETCH_MAIL_VERIFICATION = 'FETCH_MAIL_VERIFICATION';
export const FETCH_STRIPE_TOKEN = 'FETCH_STRIPE_TOKEN';

const WP_API_ENDPOINT = `${RT_API.root}wp/v2`;
const PRETTYPERMALINK_ENDPOINT = `${RT_API.root}react-theme/v1/prettyPermalink/`;
const MENU_ENDPOINT = `${RT_API.root}react-theme/v1/menu-locations/`;
const ACF_ENDPOINT = `${RT_API.root}react-theme/v1/acf`;
const ENTRY_BOX_ENDPOINT = `${RT_API.root}react-theme/v1/entry-box`;
const ENTRY_DATA_ITEM_ENDPOINT = `${RT_API.root}react-theme/v1/entry-box-item`;
const FAQ_ENDPOINT = `${RT_API.root}react-theme/v1/accordion-faq`;
const REWARDS_ENDPOINT = `${RT_API.root}react-theme/v1/accordion-rewards`;
const LOGIN_ENDPOINT = `${RT_API.root}react-theme/v1/login`;
const CUSTOMER_ENDPOINT = `${RT_API.root}react-theme/v1/customer`;
const CUSTOMER_REGISTER_ENDPOINT = `${RT_API.root}react-theme/v1/customer/register`;
const CUSTOMER_LOGOUT_ENDPOINT = `${RT_API.root}react-theme/v1/customer/logout`;
const LOST_PASSWORD_ENDPOINT = `${RT_API.root}react-theme/v1/lost-password`;
const CHANGE_PASSWORD_ENDPOINT = `${RT_API.root}react-theme/v1/change-password`;
const SEND_MAIL_ENDPOINT = `${RT_API.root}react-theme/v1/sending-informative-mail`;
const MAIL_VERIFICATION_ENDPOINT = `${RT_API.root}react-theme/v1/mail-verification`;
const HEALTHMAKERS_ENDPOINT = `${RT_API.root}react-theme/v1/healthmakers`;
const EXPERIENCES_ENDPOINT = `${RT_API.root}react-theme/v1/experiences`;
const THEME_OPTION_ENDPOINT = `${RT_API.root}react-theme/v1/theme-option`;
const CUSTOMER_INFO_ENDPOINT = `${RT_API.root}react-theme/v1/customer/info`;
const CUSTOMER_INFO_UPDATE_ENDPOINT = `${RT_API.root}react-theme/v1/customer/update`;
const TOKEN_ENDPOINT = `${RT_API.root}react-theme/v1/donation-record`;
const TOKEN_ALTERNATIVE_ENTRY = `${RT_API.root}react-theme/v1/alternative-entry`;
const FACEBOOK_LOGIN_ENDPOINT = `${RT_API.root}react-theme/v1/facebook-login`;
const ALTERNATIVE_PASSWORD_CHANGE_ENDPOINT = `${RT_API.root}react-theme/v1/customer/alternative-password-change`;
const NO_PASSWORD = `${RT_API.root}react-theme/v1/no-password`;

export function fetchPosts(pageNum = 1, post_type = 'posts') {
    return function (dispatch) {
        axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&page=${pageNum}`)
            .then(response => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: response.data
                });
            });
    }
}

export function fetchPostsFromTax(tax = 'categories', taxId = 0, pageNum = 1, post_type = 'posts') {
    return function (dispatch) {
        const url = `${WP_API_ENDPOINT}/${post_type}?_embed&${tax}=${taxId}&page=${pageNum}`;
        axios.get(url)
            .then(response => {
                dispatch({
                    type: CATEGORY_POSTS,
                    payload: response.data
                });
            });
    }
}

export function getTaxIdFromSlug(tax, slug) {
    return function (dispatch) {
        axios.get(`${WP_API_ENDPOINT}/${tax}?slug=${slug}`)
            .then(response => {
                switch (tax) {
                    case "tags":
                        dispatch({
                            type: FETCH_TAG_INFO,
                            payload: response.data
                        });
                        break;
                    case "categories":
                        dispatch({
                            type: FETCH_CAT_INFO,
                            payload: response.data
                        });
                        break;
                }

            });
    }
}

export function fetchPost(prettyPermalink) {
    return function (dispatch) {
        axios.post(`${PRETTYPERMALINK_ENDPOINT}`, {
            url: prettyPermalink,
        })
            .then(response => {
                dispatch({
                    type: FETCH_POST,
                    payload: [response.data]
                });
            });
    }
}

export function fetchTaxInfo(tax, tagIds) {
    return function (dispatch) {
        axios.get(`${WP_API_ENDPOINT}/${tax}/?include=${tagIds}`)
            .then(response => {
                dispatch({
                    type: FETCH_TAG_INFO,
                    payload: response.data
                });
            });
    }
}

export function fetchMenu(menu) {
    return function (dispatch) {
        axios.get(`${MENU_ENDPOINT}${menu}`)
            .then(response => {
                dispatch({
                    type: FETCH_MENU,
                    payload: {items: response.data, name: menu}
                });
            });
    }
}

export function searchSite(term, post_type = 'posts') {
    return function (dispatch) {
        axios.get(`${WP_API_ENDPOINT}/${post_type}?_embed&search=${term}`)
            .then(response => {
                dispatch({
                    type: SEARCH_POSTS,
                    payload: response.data
                });
            })
    }
}

export function fetchComments(postId) {
    return function (dispatch) {
        axios.get(`${WP_API_ENDPOINT}/comments?post=${postId}&orderby=parent&per_page=100`)
            .then(response => {
                dispatch({
                    type: FETCH_COMMENTS,
                    payload: response.data
                });
            })
    }
}

export function createComment(params = {post: 0, parent: 0, author_name: '', author_email: '', content: ''}) {
    return function (dispatch) {
        axios({
            method: 'post',
            url: `${WP_API_ENDPOINT}/comments`,
            headers: {'X-WP-Nonce': RT_API.nonce},
            data: params
        })
            .then(response => {
                dispatch({
                    type: CREATE_COMMENT,
                    payload: response.data
                });
            });
    }
}

export function fetchAcf(obj) {
    return function (dispatch) {
        axios.post(`${ACF_ENDPOINT}`, {
            id: obj.id,
            pages: obj.pages
        })
            .then(response => {
                dispatch({
                    type: FETCH_ACF,
                    payload: [response.data]
                });
            });
    }
}

export function fetchEntryBox() {
    return function (dispatch) {
        axios.get(`${ENTRY_BOX_ENDPOINT}`)
            .then(response => {
                dispatch({
                    type: FETCH_ENTRY_BOX,
                    payload: response.data
                });
            });
    }
}

export function fetchEntryDataItem(id) {
    return axios.get(`${ENTRY_DATA_ITEM_ENDPOINT}/?id=${id}`)
        .then(response => response.data);
}

export function fetchExperiences(obj) {
    return axios.get(`${EXPERIENCES_ENDPOINT}/?status=${obj.status}&pages=${obj.quantity}&order=${obj.order}&paged=${obj.paged}`)
        .then(response => response.data);
}

export function fetchThemeOption(obj) {
    return axios.post(`${THEME_OPTION_ENDPOINT}`, {
        options: obj,
    })
        .then(response => response.data);
}

export function fetchCustomerInfo(obj) {
    return axios.post(`${CUSTOMER_INFO_ENDPOINT}`, {
        id: obj.id,
        email: obj.email,
        info: obj.info,
    })
        .then(response => response.data);
}

export function fetchCustomerInfoUpdate(obj) {    
    return axios.post(`${CUSTOMER_INFO_UPDATE_ENDPOINT}`, {
        id: obj.id,
        email: obj.email,
        info: obj.info,
        data: obj.data,
    })
        .then(response => response.data);
}

export function fetchAlternativePasswordChange(obj) {    
    return axios.post(`${ALTERNATIVE_PASSWORD_CHANGE_ENDPOINT}`, {
        id: obj.id,
        email: obj.email,
        current_password: obj.current_password,
        new_password: obj.new_password,
        re_type_password: obj.re_type_password,
    })
        .then(response => response.data);
}

export function fetchFaq() {
    return function (dispatch) {
        axios.get(`${FAQ_ENDPOINT}`)
            .then(response => {
                dispatch({
                    type: FETCH_FAQ,
                    payload: [response.data]
                });
            });
    }
}

export function fetchRewards() {
    return function (dispatch) {
        axios.get(`${REWARDS_ENDPOINT}`)
            .then(response => {
                dispatch({
                    type: FETCH_REWARDS,
                    payload: [response.data]
                });
            });
    }
}

export function fetchLogin(obj) {
    return function (dispatch) {
        axios.post(`${LOGIN_ENDPOINT}`, {
            user: obj.email,
            password: obj.password
        })
            .then(response => {
                dispatch({
                    type: FETCH_LOGIN,
                    payload: [response.data]
                });
            });
    }
}

export function fetchLoginTwo(obj) {
    return axios.post(`${LOGIN_ENDPOINT}`, {
            user: obj.email,
            password: obj.password
        })
            .then(response => response.data);
}

export function fetchCustomer(id) {
    return function (dispatch) {
        axios.post(`${CUSTOMER_ENDPOINT}`, {
            id: id,
        })
            .then(response => {
                dispatch({
                    type: FETCH_CUSTOMER,
                    payload: [response.data]
                });
            });
    }
}

export function fetchCustomerTwo(id) {
    return axios.get(`${CUSTOMER_ENDPOINT}`, {
        id: id,
    })
        .then(response => [response.data]);
}

export function fetchCustomerRegister(obj) {
    return function (dispatch) {
        axios.post(`${CUSTOMER_REGISTER_ENDPOINT}`, {
            email: obj.email,
            password: obj.password
        })
            .then(response => {
                dispatch({
                    type: FETCH_CUSTOMER_REGISTER,
                    payload: [response.data]
                });
            });
    }
}

export function fetchCustomerLogout() {
    return axios.get(`${CUSTOMER_LOGOUT_ENDPOINT}`)
        .then(response => response.data);

}

export function fetchLostPassword(email, pathname) {
    return function (dispatch) {
        axios.post(`${LOST_PASSWORD_ENDPOINT}`, {
            email: email,
            pathname: pathname
        })
            .then(response => {
                dispatch({
                    type: FETCH_LOST_PASSWORD,
                    payload: [response.data]
                });
            });
    }
}

export function fetchLostPasswordConfirmation(recoveryKey) {
    return function (dispatch) {
        axios.post(`${LOST_PASSWORD_ENDPOINT}/confirmation`, {
            recoveryKey: recoveryKey
        })
            .then(response => {
                dispatch({
                    type: FETCH_LOST_PASSWORD,
                    payload: [response.data]
                });
            });
    }
}

export function fetchChangePassword(obj) {
    return function (dispatch) {
        axios.post(`${CHANGE_PASSWORD_ENDPOINT}`, {
            recoveryKey: obj.recoveryKey,
            login: obj.login,
            password: obj.password,
            confirmPassword: obj.confirmPassword
        })
            .then(response => {
                dispatch({
                    type: FETCH_CHANGE_PASSWORD,
                    payload: [response.data]
                });
            });
    }
}

export function fetchSelectedEntry(entry) {
    return function (dispatch) {
        dispatch({
            type: SELECTED_ENTRY,
            payload: entry
        })
        
    }
}

export function fetchSelectedEntryPageId(id) {
    return function (dispatch) {
        dispatch({
            type: EXP_PAGE_ID,
            payload: id
        })
        
    }
}

export function fetchSendMail(obj) {
    return axios.post(`${SEND_MAIL_ENDPOINT}`, {
        subject: obj.subject,
        body: obj.body,
    })
        .then(response => response.data);
}


export function fetchHealthmakers() {
    return axios.get(`${HEALTHMAKERS_ENDPOINT}`)
        .then(response => response.data);
}

export function handleStripeToken(token, form, exp_id, entries, amount, userId, entry_id) {
    return axios.post(`${TOKEN_ENDPOINT}`, {
            paymentMethod: 'Stripe',
            userId: userId,
            // Form
                country: form.country ? form.country : '',
                email: form.email ? form.email : '',
                firstName: form.firstName ? form.firstName : '',
                lastName: form.lastName ? form.lastName : '',
                phoneNumber: form.phoneNumber ? form.phoneNumber : '',
                zipCode: form.zipCode ? form.zipCode : '',
            //Stripe
                cardId: token.card.id,
                last4: token.card.last4,
                expMonth: token.card.exp_month,
                expYear: token.card.exp_year,
                stripe_email: token.email,
                token: token.id ? token.id : '',
            // Exp
                exp_id: exp_id ? exp_id : '',
            // Entry
                entries: entries ? entries : 0,
                amount: amount ? amount : 0,
                entry_id: entry_id ? entry_id : 0,
        })
            .then(response => response.data);
}

export function handlePaypalToken(data, form, exp_id, entries, amount, userId, entry_id) {
    return axios.post(`${TOKEN_ENDPOINT}`, {
            paymentMethod: 'PayPal',
            userId: userId,
            // Form
                country: form.country ? form.country : '',
                email: form.email ? form.email : '',
                firstName: form.firstName ? form.firstName : '',
                lastName: form.lastName ? form.lastName : '',
                phoneNumber: form.phoneNumber ? form.phoneNumber : '',
                zipCode: form.zipCode ? form.zipCode : '',
            // PayPal
                orderId: data.orderID ? data.orderID : '',
                payerId: data.payerID ? data.payerID : '',
                paymentId: data.paymentID ? data.paymentID : '',
                token: data.paymentToken ? data.paymentToken : '',
            // Exp
                exp_id: exp_id ? exp_id : '',
            // Entry
                entries: entries ? entries : 0,
                amount: amount ? amount : 0,
                entry_id: entry_id ? entry_id : 0,
        })
            .then(response => response.data);
}

export function handleAlternativeEntry(form, exp_id) {
    return axios.post(`${TOKEN_ALTERNATIVE_ENTRY}`, {
            // Form
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            country: form.country,
            city: form.city,
            zip: form.zip,
            age: form.age,
            // Exp
            exp_id: exp_id ? exp_id : '',
        })
            .then(response => response.data);
}

export function fetchMailVerification(email, extraMessage) {
    return function (dispatch) {
        axios.post(`${MAIL_VERIFICATION_ENDPOINT}`, {
            email: email,
            extraMessage, extraMessage,
        })
            .then(response => {
                dispatch({
                    type: FETCH_MAIL_VERIFICATION,
                    payload: [response.data]
                });
            });
    }
}

export function fetchMailVerificationTwo(email, extraMessage) {
    return axios.post(`${MAIL_VERIFICATION_ENDPOINT}`, {
            email: email,
            extraMessage: extraMessage,
        })
            .then(response => response.data);
}

export function fetchFacebookLogin(data) {
    return axios.post(`${FACEBOOK_LOGIN_ENDPOINT}`, {
        email: data.email,
        name: data.name
    })
        .then(response => response.data);
}

export function fetchNoPassword(email) {
    return axios.post(`${NO_PASSWORD}`, {
        email: email,
    })
        .then(response => response.data);
}
