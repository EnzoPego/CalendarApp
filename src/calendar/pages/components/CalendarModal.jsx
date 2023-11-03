import { addHours, differenceInSeconds } from "date-fns";
import { useState } from "react";
import Modal from "react-modal";

import DatePicker,{registerLocale} from "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es',es)


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [formValues, setformValues] = useState({
    title: "Enzo",
    notes: "Cualquiera",
    start: new Date(),
    end: addHours(new Date(), 2),
  });


  const onInputChanged = (event) => {
    setformValues({
      ...formValues,
      [event.target.name]: [event.target.value],
    });
  };

  const onDateChanged = (event, changing) => {
    setformValues({
      ...formValues,
      [changing]: event,
    });
  }


  const onCloseModal = () => {
    console.log("cerrando modal");
    setIsOpen(false);
  };
  

  const onSubmit = (event) =>{
    event.preventDefault()

    const difference = differenceInSeconds(formValues.end, formValues.start)
    //console.log({difference})

    if ( isNaN(difference) || difference <= 0) {
      console.log('Error de fecha')
      return
    }

    if (formValues.title.length <= 0)
    return
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event)=>onDateChanged(event,'start')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale='es'
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event)=>onDateChanged(event,'end')}
            className="form-control"
            dateFormat="Pp" 
            showTimeSelect
            locale='es'
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
