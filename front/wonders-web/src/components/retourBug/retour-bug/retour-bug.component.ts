import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import html2canvas from 'html2canvas';
import { ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { ToastService } from '../../../app/service/toast/toast.service';

@Component({
  selector: 'app-retour-bug',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, CommonModule],
  templateUrl: './retour-bug.component.html',
  styleUrl: './retour-bug.component.css'
})
export class RetourBugComponent {
  showModal = false;
  bugDescription = '';
  screenshot: string | null = null;

  @ViewChild('pageContent', { static: false }) pageContent!: ElementRef;
  private toastService = inject(ToastService);

  constructor() {
    emailjs.init('-IlhmdFdw5MzdRDxs');
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.screenshot = null;
    this.bugDescription = '';
  }

  async takeScreenshot() {
    // Masque temporairement la modale
    this.showModal = false;
    await new Promise((res) => setTimeout(res, 100));

    const canvas = await html2canvas(document.body);
    this.screenshot = canvas.toDataURL('image/png');
    this.showModal = true;
  }

  sendEmail() {
    const templateParams = {
      message: this.bugDescription,
      screenshot: this.screenshot || ''
    };

    emailjs
      .send('service_ebmh2n3', 'template_bzt9sco', templateParams)
      .then(() => {
        this.toastService.success(`Email envoyé avec succès !`);
        this.closeModal();
      })
      .catch((err) => {
        console.error('Erreur EmailJS:', err);
        this.toastService.error(`Erreur lors de l’envoi du mail !`);
      });
  }
}
