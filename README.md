# AliceInWonderland

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Creating basic views 

**Welcome, Chapterss List, Chapter Add, Chapter Details**

### Chapter List
The story is divided into chapters. Each chapter has its own title, the main sentence, the mathematical puzzle and the main character. The chapters are created as a list.

### Chapter Add/Details

Using the same component to view the existing chapters and add a new one, I had to disable the initial fields in ngOnInit, and if the form's name is  'New', field names were set to enabled. I validate name of the chapter to have at least 6 caracters.


                   ngOnInit(): void {
                          this.chapterForm = this.fb.group({
                            chapterName: [{value: '', disabled: true}, [Validators.required, Validators.minLength(6)]],
                            chapterSentence: [{value: '', disabled: true}],
                            puzzle: [{value: '', disabled: true}],
                            mainCharacter: [{value: '', disabled: true}]
                          });
                          this.sub = this.chapterService.selectedChapterChanges$.subscribe(
                            selectedChapter => {
                              if (selectedChapter.chapterName === 'New') {
                                this.chapterForm.get('chapterName').enable();
                                this.chapterForm.get('chapterSentence').enable();
                                this.chapterForm.get('puzzle').enable();
                                this.chapterForm.get('mainCharacter').enable();
                              }
                              this.displayChapter(selectedChapter)
                            }
                          );
                          this.getChapter();
              }
              
 
New chapter *id* has value of the length of the existing chapters list plus one.


            <button class="btn btn-primary bg" [routerLink]="['/chapters', chapters?.length + 1]"                                                 (click)="newChapter(chapters?.length + 1)"> Add </button>
            
There is a link from each chapter to play puzzle related to that chapter.

**Screenshots**

Welcome

![Slika zaslona 2021-07-09 u 09 12 49](https://user-images.githubusercontent.com/6881169/125039509-dd73c480-e096-11eb-9ae7-23b1840cea53.png)

Details


![Slika zaslona 2021-07-09 u 09 13 42](https://user-images.githubusercontent.com/6881169/125039577-eebcd100-e096-11eb-908b-7c92684faa71.png)

List


![Slika zaslona 2021-07-09 u 09 13 12](https://user-images.githubusercontent.com/6881169/125039552-e82e5980-e096-11eb-9908-6578b91db661.png)

Validation/add


![Slika zaslona 2021-07-09 u 09 14 08](https://user-images.githubusercontent.com/6881169/125039567-ec5a7700-e096-11eb-8b26-afe73f29563d.png)


