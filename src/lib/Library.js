class Library {
  contructor({ needsAPIKey = false }) {
    this.needsAPIKey = needsAPIKey
  }

  set needsAPIKey(boolean) {
    this.needsAPIKey = boolean
  }
}

module.exports = new Library()
