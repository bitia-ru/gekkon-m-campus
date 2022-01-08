import { closeUserSession } from '@/v2/utils/auth';

const Items = [
  {
    title: 'Профиль',
    clickable: true,
    navigate: '#profile',
    ifLoggedIn: true,
  },
  {
    title: 'Выйти',
    clickable: true,
    onClicked: () => { closeUserSession(); },
    ifLoggedIn: true,
  },
  {
    title: 'Зарегистрироваться',
    clickable: true,
    navigate: '#signup',
    ifGuest: true,
  },
  {
    title: 'Войти',
    clickable: true,
    navigate: '#signin',
    ifGuest: true,
  },
  {
    title: 'Действия',
    clickable: true,
    navigate: '/history',
    ifLoggedIn: true,
  },
];

export default Items;
