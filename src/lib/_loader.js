export default class Loader {
  constructor(dir) {
    this.lib = this.load(dir)
  }

  load(directory) {
    console.log(directory)
    return new Promise((resolve, reject) => {
      let dir = []
      Object.keys(directory).forEach(i => {
        let item = directory[i]
        console.log(item)
        resolve(dir.push(new item()))
      })
      reject(new Error('Oops, loader failed'))
    })
  }
}
