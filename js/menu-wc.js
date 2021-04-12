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
                    <a href="index.html" data-type="index-link">faastener documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
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
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-19b9fd09de6f7515c67ba6d9ffe56869"' : 'data-target="#xs-components-links-module-AppModule-19b9fd09de6f7515c67ba6d9ffe56869"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-19b9fd09de6f7515c67ba6d9ffe56869"' :
                                            'id="xs-components-links-module-AppModule-19b9fd09de6f7515c67ba6d9ffe56869"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BannerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BannerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OverviewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OverviewComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link">CoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-958a089d36eed0e7d17bfde48d80279d"' : 'data-target="#xs-injectables-links-module-CoreModule-958a089d36eed0e7d17bfde48d80279d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-958a089d36eed0e7d17bfde48d80279d"' :
                                        'id="xs-injectables-links-module-CoreModule-958a089d36eed0e7d17bfde48d80279d"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AppConfigService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DataService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LogoLocatorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>LogoLocatorService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RandomColorService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>RandomColorService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/InformationModule.html" data-type="entity-link">InformationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-InformationModule-0d40dd4ee17760d977066b5794d66bab"' : 'data-target="#xs-components-links-module-InformationModule-0d40dd4ee17760d977066b5794d66bab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-InformationModule-0d40dd4ee17760d977066b5794d66bab"' :
                                            'id="xs-components-links-module-InformationModule-0d40dd4ee17760d977066b5794d66bab"' }>
                                            <li class="link">
                                                <a href="components/FaqComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FaqComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FrameworkComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FrameworkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InformationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResourcesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ResourcesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InformationRoutingModule.html" data-type="entity-link">InformationRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' : 'data-target="#xs-components-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' :
                                            'id="xs-components-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' }>
                                            <li class="link">
                                                <a href="components/BottomNavComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BottomNavComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChildGroupingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChildGroupingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriterionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CriterionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FrameworkRendererComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FrameworkRendererComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PageNotFoundComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' : 'data-target="#xs-pipes-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' :
                                            'id="xs-pipes-links-module-SharedModule-6aadae6e22b9801db2869e2bdd65e15a"' }>
                                            <li class="link">
                                                <a href="pipes/SetToArrayPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SetToArrayPipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/TruncatePipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TruncatePipe</a>
                                            </li>
                                            <li class="link">
                                                <a href="pipes/YesNoPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">YesNoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TechnologiesModule.html" data-type="entity-link">TechnologiesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TechnologiesModule-c62af9aebb12b438e913b1bf9bb85f7e"' : 'data-target="#xs-components-links-module-TechnologiesModule-c62af9aebb12b438e913b1bf9bb85f7e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TechnologiesModule-c62af9aebb12b438e913b1bf9bb85f7e"' :
                                            'id="xs-components-links-module-TechnologiesModule-c62af9aebb12b438e913b1bf9bb85f7e"' }>
                                            <li class="link">
                                                <a href="components/CriterionFilterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CriterionFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TechnologiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TechnologiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TechnologyDetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TechnologyDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TechnologyListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TechnologyListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TechnologyTableComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TechnologyTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TechnologiesRoutingModule.html" data-type="entity-link">TechnologiesRoutingModule</a>
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
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnsureModuleLoadedOnceGuard.html" data-type="entity-link">EnsureModuleLoadedOnceGuard</a>
                            </li>
                            <li class="link">
                                <a href="classes/TableColumn.html" data-type="entity-link">TableColumn</a>
                            </li>
                            <li class="link">
                                <a href="classes/TechnologyDataSource.html" data-type="entity-link">TechnologyDataSource</a>
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
                                <a href="guards/FrameworkResolver.html" data-type="entity-link">FrameworkResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/ResourcesResolver.html" data-type="entity-link">ResourcesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TechnologiesResolver.html" data-type="entity-link">TechnologiesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TechnologyDetailsResolverService.html" data-type="entity-link">TechnologyDetailsResolverService</a>
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
                                <a href="interfaces/ClassificationCriterion.html" data-type="entity-link">ClassificationCriterion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassificationFramework.html" data-type="entity-link">ClassificationFramework</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassificationFrameworkResponse.html" data-type="entity-link">ClassificationFrameworkResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassificationView.html" data-type="entity-link">ClassificationView</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassificationViewCombination.html" data-type="entity-link">ClassificationViewCombination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassificationViewCombinationResponse.html" data-type="entity-link">ClassificationViewCombinationResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ClassificationViewResponse.html" data-type="entity-link">ClassificationViewResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriteriaBasedQuery.html" data-type="entity-link">CriteriaBasedQuery</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriteriaGrouping.html" data-type="entity-link">CriteriaGrouping</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriteriaGroupingResponse.html" data-type="entity-link">CriteriaGroupingResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriteriaReview.html" data-type="entity-link">CriteriaReview</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriterionFilterConfiguration.html" data-type="entity-link">CriterionFilterConfiguration</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriterionFilterValue.html" data-type="entity-link">CriterionFilterValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriterionInstance.html" data-type="entity-link">CriterionInstance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CriterionValue.html" data-type="entity-link">CriterionValue</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoResource.html" data-type="entity-link">InfoResource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InfoResourceSection.html" data-type="entity-link">InfoResourceSection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RenderedFilterBlock.html" data-type="entity-link">RenderedFilterBlock</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SimpleDataSource.html" data-type="entity-link">SimpleDataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sort.html" data-type="entity-link">Sort</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Technology.html" data-type="entity-link">Technology</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TechnologyDossier.html" data-type="entity-link">TechnologyDossier</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TechnologyDossierResponse.html" data-type="entity-link">TechnologyDossierResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TechnologyFilterConfiguration.html" data-type="entity-link">TechnologyFilterConfiguration</a>
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
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
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