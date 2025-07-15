import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class _LocalStorageService {

  constructor(
    // private firebaseService:FirebaseService,
    private router: Router,
    // private database: Database
  ) { }


  public setPageIndexAndPageSize(data: any) {
    localStorage.setItem('pageIndexAndPageSize', JSON.stringify(data));
  }

  public getPageIndexAndPageSize() {
    let value = JSON.parse(localStorage.getItem('pageIndexAndPageSize') || '{}');
    return value;
  }

  public set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  public get(key: string) {
    let value = JSON.parse(localStorage.getItem(key) || '{}');
    return value;
  }

  public setValue(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  public getValue(key: string) {
    return localStorage.getItem(key) || undefined;
  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public setUserItem(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  //-------------------------------- Assets Charts -----------------------------
  public setStatusAssetsChart(chart: any) {
    localStorage.setItem('statusAssetsChart', JSON.stringify(chart));
  }

  public getStatusAssetsChart() {
    let chart = JSON.parse(localStorage.getItem('statusAssetsChart') || '{}');
    return chart;
  }

  public setTypeAssetsChart(chart: any) {
    localStorage.setItem('typeAssetsChart', JSON.stringify(chart));
  }

  public getTypeAssetsChart() {
    let chart = JSON.parse(localStorage.getItem('typeAssetsChart') || '{}');
    return chart;
  }

  public setVendorsAssetsChart(chart: any) {
    localStorage.setItem('vendorsAssetsChart', JSON.stringify(chart));
  }

  public getVendorsAssetsChart() {
    let chart = JSON.parse(localStorage.getItem('vendorsAssetsChart') || '{}');
    return chart;
  }

  public setClassificationsAssetsChart(chart: any) {
    localStorage.setItem('classificationsAssetsChart', JSON.stringify(chart));
  }

  public getClassificationsAssetsChart() {
    let chart = JSON.parse(localStorage.getItem('classificationsAssetsChart') || '{}');
    return chart;
  }

  public setBranchesAssetsChart(chart: any) {
    localStorage.setItem('branchesAssetsChart', JSON.stringify(chart));
  }

  public getBranchesAssetsChart() {
    let chart = JSON.parse(localStorage.getItem('branchesAssetsChart') || '{}');
    return chart;
  }

  public setDepartmentsAssetsChart(chart: any) {
    localStorage.setItem('departmentsAssetsChart', JSON.stringify(chart));
  }

  public getDepartmentsAssetsChart() {
    let chart = JSON.parse(localStorage.getItem('departmentsAssetsChart') || '{}');
    return chart;
  }

  public setBrandsAssetsChart(chart: any) {
    localStorage.setItem('brandsAssetsChart', JSON.stringify(chart));
  }

  public getBrandsAssetsChart() {
    let chart = JSON.parse(localStorage.getItem('brandsAssetsChart') || '{}');
    return chart;
  }

  //-------------------------------- end Assets Charts -----------------------------

  public getUserForCheck() {
    return localStorage.getItem('user');
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public removeUserItem() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    localStorage.removeItem('privilege');
    // this.cookieService.delete('user');
    // this.cookieService.delete('tokenManager');
    // localStorage.clear();
  }
  //----------------------------------------
  public setAllSystemUsersItem(users: any) {
    localStorage.setItem('allSystemUsers', JSON.stringify(users));
  }

  public getAllSystemUsersItem() {
    return JSON.parse(localStorage.getItem('allSystemUsers') || '{}');
  }

  public removeAllSystemUsersItem() {
    localStorage.removeItem('allSystemUsers');
    // localStorage.setItem('allSystemUsers', null);
  }

  //--------------------------------------------
  public setSystemUserItem(user: any) {
    localStorage.setItem('systemUser', JSON.stringify(user));
  }
  public getSystemUserItem() {
    return JSON.parse(localStorage.getItem('systemUser') || '{}');
  }

  public getsystemUserForCheck() {
    return localStorage.getItem('systemUser');
  }

  public removeSystemUserItem() {
    localStorage.removeItem('systemUser');
  }
  //----------------------------------------

  public setFirsrtName(firstName: any) {
    localStorage.setItem('firstName', firstName);
  }

  public getFirsrtName(): any {
    return localStorage.getItem('firstName');
  }

  //----------------------------------------

  public setRefreshStatus(refresh: boolean) {
    localStorage.setItem('refresh', refresh.toString());
  }

  public getRefreshStatus(): boolean {
    let refresh = localStorage.getItem('refresh') === 'true';
    return refresh;
  }
  //----------------------------------------

  public setLanguageCode(currentLang: any) {
    localStorage.setItem('currentLanguage', currentLang);
  }

  public getLanguageCode(): any {
    return localStorage.getItem('currentLanguage');
  }

  //---------------------------------------
  public setPrivileges(data: any) {
    localStorage.setItem('privileges', JSON.stringify(data));

    // alert((localStorage.getItem('privileges') === this.cookieService.get('allPrivleges')))

  }
  public setPrivilegesOnly(privileges: any) {
    localStorage.setItem('privileges', JSON.stringify(privileges));
  }
}