import { ROLES } from 'library/hooks/common/user/types';

export const getUserRole = (user) => {
  if (user.first_name.length && user.is_coach) {
    return ROLES.SPECIALIST;
  }

  if (user.first_name.length && !user.is_coach) {
    return ROLES.CUSTOMER;
  }

  return ROLES.GUEST;
};
