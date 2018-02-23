const styles = {
  panel: {
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    width: 200,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  buttonHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  panelTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  panelButton: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
  },
  panelInputHolder: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },
  panelInput: {
    marginBottom: 5,
  },
  panelInputLabel: {
    marginBottom: 5,
  },
  panelErrorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 10,
  },
};

export default styles;
