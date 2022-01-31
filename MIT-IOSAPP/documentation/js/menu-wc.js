'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mit-ws documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' : 'data-target="#xs-components-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' :
                                            'id="xs-components-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppointmentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppointmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EventsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EventsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GeocodingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GeocodingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomepageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomepageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InternalinfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InternalinfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InternationalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InternationalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultsListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoomsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' : 'data-target="#xs-injectables-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' :
                                        'id="xs-injectables-links-module-AppModule-2c62cf33bbde349d2269943a54fffae0ad593a71f153d5820b55d43291e4af6aa61ed79799c2dbed7dcedac0d0259fb8f7098c8928d2109801bf44078e8757ed"' }>
                                        <li class="link">
                                            <a href="injectables/NominatimService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NominatimService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/I18nModule.html" data-type="entity-link" >I18nModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/MapPoint.html" data-type="entity-link" >MapPoint</a>
                            </li>
                            <li class="link">
                                <a href="classes/NominatimResponse.html" data-type="entity-link" >NominatimResponse</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppointmentsService.html" data-type="entity-link" >AppointmentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventService.html" data-type="entity-link" >EventService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpService.html" data-type="entity-link" >HttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtService.html" data-type="entity-link" >JwtService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginService.html" data-type="entity-link" >LoginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link" >NewsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NominatimService.html" data-type="entity-link" >NominatimService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterService.html" data-type="entity-link" >RegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RoomsService.html" data-type="entity-link" >RoomsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/JwtGuard.html" data-type="entity-link" >JwtGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Appointment.html" data-type="entity-link" >Appointment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateEvent.html" data-type="entity-link" >CreateEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateNews.html" data-type="entity-link" >CreateNews</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateRoom.html" data-type="entity-link" >CreateRoom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateUser.html" data-type="entity-link" >CreateUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Event.html" data-type="entity-link" >Event</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/News.html" data-type="entity-link" >News</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Room.html" data-type="entity-link" >Room</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Room-1.html" data-type="entity-link" >Room</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});