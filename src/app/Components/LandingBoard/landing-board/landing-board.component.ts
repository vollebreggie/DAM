import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { Landing } from 'src/app/Models/Landing';
import { DAMService } from 'src/app/Services/DAMService';
import { Material } from 'src/app/Models/Material';
import { Reference } from 'src/app/Models/Reference';
import { environment } from 'src/environments/environment';
import { NavigationService } from 'src/app/Services/NavigationService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from 'src/app/Models/Message';

@Component({
  selector: 'app-landing-board',
  templateUrl: './landing-board.component.html',
  styleUrls: ['./landing-board.component.css']
})
export class LandingBoardComponent implements OnInit {

  landing: Landing;
  products: Product[];
  woodMaterials: Material[];
  stoneMaterials: Material[];
  references: Reference[];
  imageUrl: string = environment.apiUrl + "images/";
  landingImage: string = "";
  contactForm: FormGroup;

  constructor(public el: ElementRef,
    private damService: DAMService,
    private navigationService: NavigationService,
    private formBuilder: FormBuilder) {
    this.navigationService.navigationSubject.next(false);
    this.damService.getLanding().subscribe(r => {
      this.landing = r.data;
      this.landingImage = this.imageUrl + this.landing.profilePicture;
    });

    this.contactForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      message: ''
    });

    this.damService.getProducts().subscribe(r => {
      console.log(r);
      this.products = r.data;
    });
    this.damService.getStoneMaterials().subscribe(r => this.stoneMaterials = r.data);
    this.damService.getWoodMaterials().subscribe(r => this.woodMaterials = r.data);
    this.damService.getReferences().subscribe(r => this.references = r.data);
    this.damService.logIp("landingspage").subscribe();
  }

  woodMaterial: string;
  woodTitle: string;

  stoneMaterial: string;
  stoneTitle: string;

  landingScroll: boolean = false;
  productsScroll: boolean = false;
  materialsScroll: boolean = false;
  contactScroll: boolean = false;
  referenceScroll: boolean = false;
  private page: number = -1;


  sendMessage() {
    let message: Message = {
      email: this.contactForm.value.email,
      firstname: this.contactForm.value.firstname,
      lastname: this.contactForm.value.lastname,
      message: this.contactForm.value.message
    }

    this.damService.postMessage(message).subscribe();
    this.contactForm.reset();
  }

  ngOnInit() {
    const scrollPosition = window.pageYOffset;
    const newPage = Math.floor(scrollPosition / 759);

    this.onHoverWood("");
    this.onHoverStone("");

    if (this.page == newPage) {
      return;
    }


    this.page = newPage;
    switch (this.page) {
      case 0: {
        this.landingScroll = true;
        this.productsScroll = false;
        break;
      }
      case 1: {
        this.landingScroll = false
        this.productsScroll = true;
        this.materialsScroll = false;
        break;
      }
      case 2: {
        this.landingScroll = false
        this.productsScroll = false;
        this.materialsScroll = true;
        this.referenceScroll = false;
        break;
      }
      case 3: {
        this.landingScroll = false
        this.materialsScroll = false;
        this.referenceScroll = true;
        this.contactScroll = false;
        break;
      }
      case 4: {
        this.landingScroll = false
        this.referenceScroll = false;
        this.contactScroll = true;
        break;
      }
    }
  }

  scroll(id) {
    let el = document.getElementById(id);
    const yOffset = -50;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  onHoverWoodByObject(material: Material) {
    this.woodTitle = material.name;
    this.woodMaterial = material.description;
  }

  onHoverStoneByObject(material: Material) {
    this.stoneTitle = material.name;
    this.stoneMaterial = material.description;
  }

  onHoverWood(name: string) {
    switch (name) {
      case "stijgerHout":
        this.woodTitle = "Steigerhout"
        this.woodMaterial = "Of je een strak interieur hebt of juist van een landelijke uitstraling geniet, steigerhout past bij elke stijl. Steigerhout is een perfect materiaal om meubels van te maken. \n \n Steigerhout is imperfect, dat houd in dat het kan werken. Juist dit maakt het product levendig en perfect voor binnen of buitenshuis. Hiernaast zou je dit wel kunnen minimaliseren, je hebt namelijk verschillende soorten steigerhout en je kan het op verschillende manieren bewerken.";
        break;
      case "sloopHout":
        this.woodTitle = "Sloophout";
        this.woodMaterial = "Sloophout of ook wel genoemd ‘’’tweedehands hout’’, is hout dat vrijkomt bij het afbreken of slopen van gebouwen, panden of andere houten objecten. Sloophout is erg aantrekkelijk vanwege het gebruikte karakter. Tevens is het duurzaam omdat je van een oud product het hout opnieuw gebruikt voor een nieuw product en hiervoor dus geen nieuwe bomen gekapt hoeven te worden. Sloophout wordt erg vaak gebruikt voor tafels, kasten of tv meubels in combinatie met staal.";
        break;
      case "eikenHout":
        this.woodTitle = "Eikenhout";
        this.woodMaterial = "Er zijn ontzettend veel soorten eiken. Traditioneel Europees eiken, Amerikaans eiken maar ook Frans en Japans eiken. Door het drogen krijg je verschillende typen hout met alle een totaal andere afwerking. Echt oud eikenhout is super authentiek en heeft een robuuste uitstraling. Dit wordt veelal gebruikt in mooie balken maar ook om compleet unieke tafelbladen te maken. ";
        break;
      case "wagonHout":
        this.woodTitle = "Wagonhout";
        this.woodMaterial = "De meeste Wagonplanken zijn van eikenhout en hebben jarenlang gediend in oude goederenwagons. bijna alle wagonplanken hebben allerlei goederen vervoerd, van biervaten, specerijen tot andere consumptiegoederen. Wanneer de wagon planken niet meer te vertrouwen zijn om hier goederen op te vervoeren worden de wagons afgekeurd en in het vervolg zie je dat er meubels van gemaakt worden. De robuuste vorm en industriële look is erg gewild in de meubel industrie. Wagonplanken zijn relatief ook wat duurder dan alle andere houtsoorten.";
        break;
      default:
        this.woodTitle = "Houten Materialen";
        this.woodMaterial = "Zweef over een plaatje heen voor meer informatie";
    }
  }

  onHoverStone(name: string) {
    switch (name) {
      case "stijgerHout":
        this.woodTitle = "Steigerhout"
        this.woodMaterial = "Of je een strak interieur hebt of juist van een landelijke uitstraling geniet, steigerhout past bij elke stijl. Steigerhout is een perfect materiaal om meubels van te maken. \n \n Steigerhout is imperfect, dat houd in dat het kan werken. Juist dit maakt het product levendig en perfect voor binnen of buitenshuis. Hiernaast zou je dit wel kunnen minimaliseren, je hebt namelijk verschillende soorten steigerhout en je kan het op verschillende manieren bewerken.";
        break;
      case "sloopHout":
        this.woodTitle = "Sloophout";
        this.woodMaterial = "Sloophout of ook wel genoemd ‘’’tweedehands hout’’, is hout dat vrijkomt bij het afbreken of slopen van gebouwen, panden of andere houten objecten. Sloophout is erg aantrekkelijk vanwege het gebruikte karakter. Tevens is het duurzaam omdat je van een oud product het hout opnieuw gebruikt voor een nieuw product en hiervoor dus geen nieuwe bomen gekapt hoeven te worden. Sloophout wordt erg vaak gebruikt voor tafels, kasten of tv meubels in combinatie met staal.";
        break;
      case "eikenHout":
        this.woodTitle = "Eikenhout";
        this.woodMaterial = "Er zijn ontzettend veel soorten eiken. Traditioneel Europees eiken, Amerikaans eiken maar ook Frans en Japans eiken. Door het drogen krijg je verschillende typen hout met alle een totaal andere afwerking. Echt oud eikenhout is super authentiek en heeft een robuuste uitstraling. Dit wordt veelal gebruikt in mooie balken maar ook om compleet unieke tafelbladen te maken. ";
        break;
      case "wagonHout":
        this.woodTitle = "Wagonhout";
        this.woodMaterial = "De meeste Wagonplanken zijn van eikenhout en hebben jarenlang gediend in oude goederenwagons. bijna alle wagonplanken hebben allerlei goederen vervoerd, van biervaten, specerijen tot andere consumptiegoederen. Wanneer de wagon planken niet meer te vertrouwen zijn om hier goederen op te vervoeren worden de wagons afgekeurd en in het vervolg zie je dat er meubels van gemaakt worden. De robuuste vorm en industriële look is erg gewild in de meubel industrie. Wagonplanken zijn relatief ook wat duurder dan alle andere houtsoorten.";
        break;
      default:
        this.woodTitle = "Stenen materialen";
        this.woodMaterial = "Zweef over een plaatje heen voor meer informatie";
    }
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {

    const scrollPosition = window.pageYOffset;
    const newPage = Math.floor((scrollPosition) / 839);

    if (this.page == newPage) {
      return;
    }

    this.page = newPage;
    switch (this.page) {
      case 0: {
        this.landingScroll = true;
        this.productsScroll = false;
        break;
      }
      case 1: {
        this.landingScroll = false
        this.productsScroll = true;
        this.materialsScroll = false;
        break;
      }
      case 2: {
        this.landingScroll = false
        this.productsScroll = false;
        this.materialsScroll = true;
        this.referenceScroll = false;
        break;
      }
      case 3: {
        this.landingScroll = false
        this.materialsScroll = false;
        this.referenceScroll = true;
        this.contactScroll = false;
        break;
      }
      case 4: {
        this.landingScroll = false
        this.referenceScroll = false;
        this.contactScroll = true;
        break;
      }
    }

  }
}
