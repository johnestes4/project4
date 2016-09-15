const styles = {
  body: {
    margin: '0 auto',
    width: '100%',
  },
  transparentBg: {
    background: 'transparent'
  },
  textOverflow: {
    whiteSpace: "wrap",
  },
  dogPicture: {
    maxWidth: '98%',
    maxHeight: '98%',
    margin: '0 auto',
    boxShadow: '2px 2px 2px 2px rgba(50, 50, 50, 0.75)',
  },
  dogPictureContainer: {
    height: '61%',
    margin: '0 auto',
    overflow: 'hidden',
    width: '80%',
  },
  dogContainer: {
    width: '500px',
    position: 'absolute',
    top: '10%',
    left: '50%',
    marginLeft: '-250px',
    height: '69%', //nice
    paddingTop: '10px',
    paddingBottom: '20px',
    background: 'rgba(75, 75, 75, 0.75)',
    boxShadow: '2px 2px 2px 2px rgba(50, 50, 50, 0.75)',
    color: 'white',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(50, 50, 50, 0.75)',
  },
  miniDogPicture: {
    width: '100px',
    maxHeight: '120px',
    boxShadow: '2px 2px 2px 2px rgba(50, 50, 50, 0.75)',
    marginTop: '5px',
  },
  miniDogContainer: {
    position: 'relative',
    display: 'inline',
    float: 'left',
    width: '150px',
    height: '100%',
    paddingBottom: '5px',
    background: 'rgba(75, 75, 75, 0.75)',
    boxShadow: '2px 2px 2px 2px rgba(50, 50, 50, 0.75)',
    color: 'white',
    margin: '0 auto',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(50, 50, 50, 0.75)',
  },
  miniDogRowOuter: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    overflowX: 'scroll',
  },
  miniDogRow: {
    marginTop: '10px',
    width: '2850px',
    height: '190px',
    textAlign: 'center',
    position: 'relative',
    bottom: '0',
  },
  miniDogText: {
    position: 'absolute',
    bottom: '0',
    margin: '0 auto',
    left: '1%',
    right: '1%',
  },
  button: {
    color: 'black',
  },
  ratingField: {
    width: '40px',
    color: 'black',
    textAlign: 'right',
  }
}

export default styles
