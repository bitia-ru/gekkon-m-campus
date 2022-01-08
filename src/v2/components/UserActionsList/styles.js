import { StyleSheet } from '../../aphrodite';

export const userActionsStyles = StyleSheet.create({
  container: {
    paddingLeft: '20px',
    paddingRight: '20px',
    marginBottom: '150px',
  },
  actionsCaption: {
    marginTop: '20px',
    marginBottom: '20px',
    marginLeft: '15px',
    fontSize: '0.8em',
  },
});

export const ascentActionStyles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FAFAFA',
    marginTop: '20px',
    marginBottom: '20px',
    padding: '15px',
    boxSizing: 'border-box',
  },
  description: {
    marginTop: '5px',
  },
  category: {
    textAlign: 'right',
    fontFamily: 'GilroyMedium, sans-serif',
    weight: 400,
  },
});
