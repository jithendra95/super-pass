import { TestBed } from '@angular/core/testing';
import { MenuController } from '../menu.controller';

describe('MenuController', () => {
  let controller: MenuController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    controller = TestBed.inject(MenuController);
  });

  it("Should have menuItems variable with at least one value",()=>{
    let menuItems  = controller.menuItems;
    expect(menuItems).toBeDefined();
    expect(menuItems.length).toBeGreaterThan(0);
  })

});
