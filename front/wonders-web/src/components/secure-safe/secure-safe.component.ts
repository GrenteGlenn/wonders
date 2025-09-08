import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BaseDirectory, readDir, copyFile, mkdir, exists, DirEntry } from '@tauri-apps/plugin-fs';
import * as path from '@tauri-apps/api/path';
import { open } from '@tauri-apps/plugin-dialog';
import { openPath } from '@tauri-apps/plugin-opener';


@Component({
  selector: 'app-secure-safe',
  standalone: true,
  imports: [MatListModule, NgForOf, NgIf],
  templateUrl: './secure-safe.component.html',
  styleUrl: './secure-safe.component.css',

})
export class SecureSafeComponent {
  selectedFileName: string | null = null;
  uploadedFiles: DirEntry[] = [];

  async ngOnInit() {
    await this.getUploadedFiles();
  }

  async ngOnChanges() {
    await this.getUploadedFiles();
  }


  async moveFile() {
    try {
      const file = await open({
        multiple: false,
        directory: false,
      });
      this.selectedFileName = file;
    } catch (e) {
      console.error(e)
    }

    // console.log('File selected:', this.selectedFileName);

    if (!this.selectedFileName) {
      console.error('No file selected.');
      return;
    }

    try {
      const name = await path.basename(this.selectedFileName);
      const src = this.selectedFileName;
      const dest = await path.appDataDir();
      if (! await exists(dest)) {
        await mkdir(dest);
      }
      await copyFile(src, await path.join(dest, name));
    } catch (err) {
      console.error('Error checking file existence:', err);
    }
    await this.getUploadedFiles();
  }

  async getUploadedFiles() {
    const files: DirEntry[] = await readDir(await path.appDataDir());
    const res: DirEntry[] = [];
    for (const file of files) {
      if (file.isFile) {
        res.push(file);
      }
    }
    this.uploadedFiles = res;
  }

  async openFile(file: DirEntry) {
    const path_name = await path.join(await path.appDataDir(), file.name);
    await openPath(path_name);
  }

}
