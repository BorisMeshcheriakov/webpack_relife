import st from './index.module.scss';

const Status = ({ status }) => {

  const getStatus = (status) => {
    switch (status) {
      case 'cancelled':
        return <span className={st.status__notPayed}>Консультация отменена</span>;
      case 'payment-unconfirmed':
        return <span className={st.status__moved}>Обработка платежа</span>;
      case 'not-payed':
        return <span className={st.status__notPayed}>Не оплачена</span>;
      case 'moving':
        return <span className={st.status__moved}>Перенос не подтвержден</span>;
      default:
        break;
    };
  };

  return (
    <div className={st.status}>
      { getStatus(status) }
    </div>
  );
};

export default Status;
