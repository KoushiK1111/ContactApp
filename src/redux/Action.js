import Realm from "realm"
import { Contact } from '../schema/schema'

let realm
realm = new Realm({ path: 'Contacts', schema: [Contact] })

export const AddContact = (data) => dispatch => {
    realm.write(() => {
        realm.create('Contact', {
            uid: data.uid,
            id: data.id,
            date: data.date,
            designation: data.designation,
            email: data.email,
            fName: data.fName,
            image: data.image,
            lName: data.lName,
            mobile: data.mobile
        })
    })
    dispatch({
        type: 'ADD_CONTACT',
        payload: data,
    })
}

export const UpdateContact = (data) => dispatch => {
    realm.write(() => {
        realm.objects('Contact').find(contact => {
            if (contact.id === data.id) {
                contact.date = data.date;
                contact.designation = data.designation;
                contact.email = data.email;
                contact.fName = data.fName;
                contact.image = data.image;
                contact.lName = data.lName;
                contact.mobile = data.mobile;
            }
        })
    })
    dispatch({
        type: 'UPDATE_CONTACT',
        payload: data,
    })
}

export const AddUid = (data) => {
    return {
        type: 'UID',
        payload: data
    }
}
