import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.interface';
import { MockApiService } from '../../services/data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', description: '', id: '' };
  editingItem: any = {};

  constructor(private mockApiService: MockApiService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.mockApiService.get('items').subscribe((response) => {
      this.items = response;
    });
  }

  addItem(): void {
    this.mockApiService.post('items', this.newItem).subscribe((response) => {
      this.items.push(response);
      this.newItem = { name: '', description: '', id: '' };
    });
  }

  editItem(item: Item): void {
    this.editingItem = { ...item };
  }

  saveItem(): void {
    this.mockApiService.put('items', this.editingItem).subscribe((response) => {
      const index = this.items.findIndex((item) => item.id === response.id);
      this.items[index] = response;
      this.editingItem = { name: '', description: '', id: '' };
    });
  }

  deleteItem(id: string): void {
    this.mockApiService.delete('items', +id).subscribe((response) => {
      const index = this.items.findIndex((item) => item.id === id);
      this.items.splice(index, 1);
    });
  }
}
