// Return false if object is empty
export const checkEmptyObject = (o) => {
  return o ? Object.keys(o).length === 0 && Object.getPrototypeOf(o) === Object.prototype : true
}