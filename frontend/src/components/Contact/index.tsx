import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IContact } from 'types';
import { useAppDispatch } from 'store/hooks';
import { deleteContact } from 'store/contact/slice';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { ReactComponent as TrashIcon } from 'assets/trash.svg';
import styles from './index.module.scss';
import { connectAdvanced } from 'react-redux';

interface IContactItemProps {
  contact: IContact;
  onDelete: () => void;
  onUpdate: () => void;
}

interface IContactListProps {
  contacts: Array<IContact>;
}


export const ContactList: React.FC<IContactListProps> = ({ contacts }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnUpdate = (idx: number) => {
    navigate(`/contacts/${idx}`)
  }
  const handleOnDelete = (idx: number) => {
    dispatch(deleteContact(idx));
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Website</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            contacts.length > 0 && contacts.map((contact, i) =>
              <ContactItem
                key={i}
                contact={contact}
                onUpdate={() => handleOnUpdate(i)}
                onDelete={() => handleOnDelete(i)} />)
          }
        </tbody>
      </table>
      {
        contacts.length === 0 && (
          <div className="text-center">
            No contacts found. Create a first one!
          </div>
        )
      }
    </div>
  )
}

export const ContactItem: React.FC<IContactItemProps> = ({ contact, onDelete, onUpdate }) => {

  return (
    <tr>
      <td>
        <img className={styles.avatar} src={contact.avatar} width="50" height="50" />
      </td>
      <td>{contact.name} {contact.lastName}</td>
      <td>{contact.email}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.age}</td>
      <td><a href={contact.linkToWebsite}>Website</a></td>
      <td>Tags</td>
      <td>
        <div className="flex items-center px-2">
          {/* <img className={styles.editIcon} src={EditIcon} /> */}
          <EditIcon className={styles.editIcon} onClick={onUpdate} />
          <TrashIcon className={styles.trashIcon} onClick={onDelete} />
        </div>
      </td>
    </tr>
  )
}