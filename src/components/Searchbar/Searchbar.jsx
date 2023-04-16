import { Formik, Form, Field } from 'formik';
import { ImSearch } from 'react-icons/im';

import css from './Searchbar.module.scss';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };
  return (
    <header className={css.Searchbar}>
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleSubmit}>
        <Form className={css.SearchForm}>
          <button className={css.SearchFormButton} type="submit">
            <ImSearch className={css.SearchFormButtonIcon} />
          </button>
          <label>
            <Field
              className={css.SearchFormIinput}
              placeholder="Search images..."
              name="searchQuery"
              type="text"
            ></Field>
          </label>
        </Form>
      </Formik>
    </header>
  );
};
