import { copyObject } from '../helper/copy-object';

export const createMockedRepository = (initialItems = []) => {
  let items = copyObject(initialItems);
  return {
    resetItems: () => { items = copyObject(initialItems) },
    save: jest.fn((item) => {
      item.id = items.length === 0 ? 1 : items[items.length - 1].id + 1;
      items.push(item);
      return item;
    }),
    find: jest.fn(() => items),
    findOne: jest.fn(({ where: { id } }) => items.find(item => item.id === id)),
    delete: jest.fn((id) => items = items.filter(item => item.id !== id)),
    update: jest.fn((id, newData) => {
      const index = items.findIndex(item => item.id === id);
      if (index >= 0) {
        items[index] = { ...items[index], ...newData }
        return { affected: 1 };
      }
      return { affected: 0 };
    }),
  }
}