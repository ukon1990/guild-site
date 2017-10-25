import { Component, OnInit, OnDestroy } from '@angular/core';
import { Oauth2Service } from 'ng2-oauth2';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

	public profile = {};
	public loggedin = false;

	// Injects the service into the component
	constructor(private oAuthService: Oauth2Service, private location: Location) { }

	ngOnInit() {
		// Suscribe to interesting events
		Oauth2Service.Authorized.subscribe(item => {
			console.log('Authorized event captured ', item.token);
			this.loggedin = true;
		});
		Oauth2Service.LoggedOut.subscribe(item => {
			console.log('Logged out event captured');
			this.loggedin = false;
			this.profile = {};
		});
		Oauth2Service.Profile.subscribe(item => {
			console.log('Profile event captured');
			this.profile = item.profile;
		});

		// At load, tries to login (If contains fragments with "access_token")
		this.oAuthService.tryLogin();
	}

	ngOnDestroy() {
		Oauth2Service.LoggedIn.unsubscribe();
		Oauth2Service.Profile.unsubscribe();
		Oauth2Service.Authorized.unsubscribe();
	}

	login() {
		this.oAuthService.login(this.location.href);
	}

	logout() {
		this.oAuthService.logout();
	}
}
