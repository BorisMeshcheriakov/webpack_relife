import { useState } from 'react';
import SVG from 'react-inlinesvg';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import ButtonRound from 'library/components/common/buttons/ButtonRound';
import Dropdown from 'library/components/common/consultCalendar/Dropdown';

import dots from './resources/dots.svg';

import st from './index.module.scss';

const Menu = ({ consultation }) => {
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const pay = { title: 'Оплатить', action: () => handlePay() };
  const move = { title: 'Перенести', action: () => handleMove() };
  const cancel = { title: 'Отменить', action: () => handleCancel() };

  const getDropItems = () => {
    let items = [];
    if (!consultation.payed.payed && !consultation.cancelled && !consultation.payed.transaction) {
      items.push(pay);
    }

    if (consultation.payed.payed && consultation.confirmed && !consultation.cancelled) {
      items.push(move);
    }

    if (!consultation.cancelled) {
      items.push(cancel);
    }

    return items;
  }

  const DropButton = ({ handler, title }) => <button className={st.button} onClick={handler}>{ title }</button>;

  const handlePay = () => {
    history.push(`/consultations/buy/${consultation.id}`);
    setShowMenu(false);
  }

  const handleMove = () => {
    history.push(`/consultations/consultation/${consultation.id}/move/${consultation.coach.id}/${consultation.type}`);
    setShowMenu(false);
  }

  const handleCancel = () => {
    history.push(`/consultations/cancel/${consultation.id}`);
  }

  return (
    <div className={st.menu}>
      <div className={st.menu__button}>
        {
          getDropItems().length > 0 &&
          <ButtonRound isActive={showMenu} handler={ () => setShowMenu(true) }>
            <SVG src={dots} alt="" className={st.icon} />
          </ButtonRound>
        }
      </div>
      <div className={cn(st.menu__dropdown, showMenu && st.active)}>
        <Dropdown close={() => setShowMenu(false)}>
          {
            getDropItems().map((item) => (
              <DropButton key={item.title} handler={item.action} title={item.title} />
            ))
          }
        </Dropdown>
      </div>
    </div>
  );
}

export default Menu;
