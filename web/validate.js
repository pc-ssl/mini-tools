const strategies = {
  isNoEmpty: function (value, errorMsg) {
    if (value.replace(/\s/g, '') === '') {
      return errorMsg;
    }
  },
};

class Validate {
  add() {}

  start() {}
}

export default Validate;
