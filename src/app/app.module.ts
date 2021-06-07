import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ArchitectComponent } from './architect/architect.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './users/users.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { SignInComponent } from './signin/signin.component';
import { QuestionairesComponent } from './questionaires/questionaires.component';
import { InspectionsComponent } from './inspections/inspections.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactUsComponent } from './contactus/contactus.component';
import { AuditingComponent } from './auditing/auditing.component';
import { AssetTrackingComponent } from './assettracking/assettracking.component';
import { OpinionPollsComponent } from './opinionpolls/opinionpolls.component';
import { _InspectionsComponent } from './_inspections/_inspections.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { InventoryComponent } from './inventory/inventory.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { CareersComponent } from './careers/careers.component';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { BusinessIntelligenceComponent } from './businessintelligence/businessintelligence.component';
import { TrainingComponent } from './training/training.component';
import { RegistrationComponent } from './register/register.component';
import { OverviewComponent } from './overview/overview.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PackagesComponent } from './packages/packages.component';
import { BillingComponent } from './billing/billing.component';
import { DemoComponent } from './demo/demo.component';
import { TemplatesComponent } from './templates/templates.component';
import { OptionsComponent } from './options/options.component';
import { InspectionsReviewComponent } from './inspections_review/inspections_review.component';
import { CertificationsReviewComponent } from './certifications_review/certifications_review.component';
import { PurchasesReviewComponent } from './purchases_review/purchases_review.component';
import { TrainingsReviewComponent } from './trainings_review/trainings_review.component';
import { SafeHtml } from 'src/extensions/SafeHtml.pipe';
import { QuestionComponent } from './question/question.component';
import { ForgotComponent } from './forgotpassword/forgot.component';
import { OTPComponent } from './otp/otp.component';
import { ResetComponent } from './resetpassword/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    DashboardComponent,
    MainComponent,
    ClientsComponent,
    ClientComponent,
    UserComponent,
    ConfigurationsComponent,
    ConfigurationComponent,
    NotFoundComponent,
    SignInComponent,
    QuestionairesComponent,
    InspectionsComponent,
    TrainingsComponent,
    CertificationsComponent,
    PurchasesComponent,
    ArchitectComponent,
    PricingComponent,
    AboutusComponent,
    ContactUsComponent,
    AuditingComponent,
    AssetTrackingComponent,
    OpinionPollsComponent,
    _InspectionsComponent,
    VisualisationComponent,
    InventoryComponent,
    CareersComponent,
    AgricultureComponent,
    BusinessIntelligenceComponent,
    TrainingsComponent,
    TrainingComponent,
    RegistrationComponent,
    OverviewComponent,
    PackagesComponent,
    BillingComponent,
    SiteFooterComponent,
    DemoComponent,
    TemplatesComponent,
    OptionsComponent,
    InspectionsReviewComponent,
    CertificationsReviewComponent,
    PurchasesReviewComponent,
    TrainingsReviewComponent,
    QuestionComponent,
    ForgotComponent,
    OTPComponent,
    ResetComponent,
    SafeHtml
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent, pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
      { path: 'clients', component: ClientsComponent },
      { path: 'client', component: ClientComponent },
      { path: 'users', component: UserComponent },
      { path: 'configurations', component: ConfigurationsComponent },
      { path: 'configuration', component: ConfigurationComponent },
      { path: 'questionaires', component: QuestionairesComponent },
      { path: 'inspections', component: InspectionsComponent },
      { path: 'certifications', component: CertificationsComponent },
      { path: 'trainings', component: TrainingsComponent },
      { path: 'purchases', component: PurchasesComponent },
      { path: 'architect', component: ArchitectComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'pricing', component: PricingComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'contactus', component: ContactUsComponent },
      { path: 'careers', component: CareersComponent },
      { path: 'auditing', component: AuditingComponent },
      { path: 'assettracking', component: AssetTrackingComponent },
      { path: 'opinionpolls', component: OpinionPollsComponent },
      { path: '_inspections', component: _InspectionsComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'visualisation', component: VisualisationComponent },
      { path: 'agriculture', component: AgricultureComponent },
      { path: 'business_intelligence', component: BusinessIntelligenceComponent },
      { path: 'training', component: TrainingComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'billing', component: BillingComponent },
      { path: 'demo', component: DemoComponent },
      { path: 'inspections_review', component: InspectionsReviewComponent },
      { path: 'certifications_review', component: CertificationsReviewComponent },
      { path: 'purchases_review', component: PurchasesReviewComponent },
      { path: 'trainigs_review', component: TrainingsReviewComponent },
      { path: 'templates', component: TemplatesComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'otp', component: OTPComponent },
      { path: 'resetpassword', component: ResetComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
