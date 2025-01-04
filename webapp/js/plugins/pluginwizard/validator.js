//Contains valudation regex for each inputs of form. 
 const dictionnaryInputValidationRegex = 
 {
 	"mandatory": /^.+$/,
 	"pluginName": /^[a-z]+$/,
	"moduleName": /^[a-z-]+$/,
	"conventionModuleName": /^[a-z]+-[a-z]+$/,
	"workflowTaskName": /^[a-z-]+$/,
	"pluginDescription": /^.{5,255}$/,
	"pluginProvider": /^.{3,255}$/,
	"pluginVersion": /^\d\.\d\.\d$/,
	"pluginCopyright": /^.{1,255}$/,
	"businessClassName": /^[A-Z][a-zA-Z]+$/,
	"businessClassNameSize":/^.{1,51}$/,
	"businessTableName": /^(?!_+$)[a-z_]+$/,
	"businessTableNameSize": /^.{1,64}$/,
	"attributeName": /^(?!\d+$)[a-z_]+$/,
	"attributeNameSize": /^.{1,64}$/,
	"adminFeatureTitle": /^.{10,80}$/,
	"adminFeatureDescription": /^.{10,255}$/,
	"adminFeatureTechName": /^[A-Z][a-zA-Z]*$/,
	"adminFeatureTechNameSize": /^.{1,100}$/,
	"adminFeatureRight":/^[A-Z_]+$/,
	"adminFeatureRightSize": /^.{1,255}$/,
	"applicationName":/^[a-z]+$/,
	"applicationClass":/^[A-Z][a-zA-Z]+$/,
	"applicationNameSize":/^.{1,100}$/,
	"applicationClassSize":/^.{1,100}$/,
	"portletClass": /^[A-Z][a-zA-Z]*Portlet$/,
	"portletClassSize":/^.{1,100}$/,
	"portletTypeName":/^[A-Z_]*_PORTLET$/,
	"portletJspName":/^Portlet[A-Z][a-zA-Z]*$/,
	"portletJspNameSize":/^.{1,100}$/,
 };

function isEmpty(value) 
{
	return value.trim() === '';
}
 
function isValidEntry(nameInputValue,regex) 
{
	return isEmpty(nameInputValue)?false:regex.test(nameInputValue);
}

function isValidURL(url)
{
	if(isEmpty(url)){
		return false;
	}
	
	try 
	{
	    new URL(url);  
	    return true;   
	} 
	catch (_) 
	{
	    return false;  
	}
}
 	
function switchIcon(isSuccess,icon) 
{	
	if(isSuccess)
	{
	 	icon.classList.remove('ti','ti-circle-x');
	 	icon.classList.add('ti','ti-circle-check');
	}
	else
	{
		icon.classList.remove('ti-circle-check');
	 	icon.classList.add('ti','ti-circle-x');			
	}
}
  	
function switchFrontMessage(isSuccess,span) 
{
    switchIcon(isSuccess,span.querySelector('i'));
    	
    if(isSuccess)
	{
 		span.classList.remove('text-danger');
 		span.classList.add('text-success');
 	}
	else
	{
 		span.classList.remove('text-success');
 		span.classList.add('text-danger');
 	}
}
    
function switchFrontInput(isSuccess , input)
{    
	if (isSuccess)
	{
 		input.classList.remove('is-invalid');
     	input.classList.add('is-valid');
 	} 
	else 
	{
         input.classList.remove('is-valid');
         input.classList.add('is-invalid');  
 	}
}

function cleanClassListInput(inputToClean) 
{
	inputToClean.classList.remove('is-invalid');
	inputToClean.classList.remove('is-valid');
}   


function getProjectName() {
	const projectNameInput = document.getElementById('plugin_name');
	return projectNameInput ? projectNameInput.value.replaceAll('-','_') : '';
}

/* Function to update help message div and input front according to the rules in dictionnaryInputValidationRegex*/
function updateHelpMessageFront(inputId) 
{     
	//Get target input in form
 	const targetInput = document.getElementById(inputId);
 		
 	if(targetInput){
    	
 		//Get value of target input
 		const targetInputValue = targetInput.value?targetInput.value:'';
 		
 		//Get div with help message associated with target input
 		const HelpMessageDivId =inputId.split('-')[0]+"-help-message-div"; //example : input name : pluginDescription-input , div name : pluginDescription-help-message-div
 		const helpMessageDiv = document.getElementById(HelpMessageDivId);
 		
 		
 		if(helpMessageDiv){
 			
 			helpMessageDiv.classList.remove('text-muted');
 			
 			const helperSpans = helpMessageDiv.querySelectorAll('span');

 			var isSpanFound = false; //Check if span is found in help message div
 			var inputValidity = true; //Check if all input are valid
 			var isValid = true; //Check if current input is valid
 			var key = ''; //key to get regex in dictionnaryInputValidationRegex
 			
 			helperSpans.forEach(span => {
 					
 				key = span.id.split('-')[0]; //example span name : pluginDescription-help-message-span
 				
 				if(dictionnaryInputValidationRegex.hasOwnProperty(key))
				{
 				
 					isValid = isValidEntry(targetInputValue,dictionnaryInputValidationRegex[key]);
 					switchFrontMessage(isValid,span);	
 					
 					inputValidity = inputValidity && isValid;
 					isSpanFound = true;
 					
 				}
				else if(key==='pluginProviderUrl')
				{
					
					isValid = isValidURL(targetInputValue);
					switchFrontMessage(isValid,span);	
					 					
					inputValidity = inputValidity && isValid;
					isSpanFound = true;
					
				}
				else if(key==='businessTableNamePrefix')
				{
					
					const projectName = getProjectName();
					const businessTableRegex = new RegExp('^' + projectName + '_[a-z_]*$');
					
					isValid = isValidEntry(targetInputValue,businessTableRegex);
					switchFrontMessage(isValid,span);	
					 					
					inputValidity = inputValidity && isValid;
					isSpanFound = true;
				}
				else
				{
					helpMessageDiv.classList.add('text-muted');
				}
 			});
 			
 			//update input state
 			if(isSpanFound) {
				switchFrontInput(inputValidity, targetInput);
			}
			else
			{
				cleanClassListInput(targetInput);
			}
 		}
 	}
}
 
/* Update all the form front */
function updateFormFront(strFormId)
{
	// Sélectionner all text type inputs in form
	const form = document.getElementById(strFormId);
	
	if(form){
		const textInputs = form.querySelectorAll('input[type="text"]');
	
		textInputs.forEach(input => {
		    updateHelpMessageFront(input.id);
		});
	}
}

/* Check if a target even concerns an input and call the update front function if is the case  */
function validationForm(event)
{
   const element = event.target;
   
   if (element.tagName === 'INPUT') {
   	updateHelpMessageFront(element.id);
   }
}

/* Function to automatically change help message div according to the project type selected
(In first page : pluginwizard_create_plugin.html) */
function switchTypeProject(strPluginFormId) 
{
	   
	//Get the project type selected
	const radios = document.querySelectorAll('input[name="project_type_selector"]');
	const selectedRadio = Array.from(radios).find(radio => radio.checked); // Find selected radio
	const projectType = selectedRadio ? selectedRadio.value.toLowerCase() : '';
	
	//Get help message div and name input
	const helpMessageDiv = document.getElementById('projectName-help-message-div');
	const projectNameInput = document.getElementById('projectName-input');
	   
	//Update innput state
	if (projectNameInput && helpMessageDiv) 
	{
		projectNameInput.value = '';
		cleanClassListInput(projectNameInput);
		
		if(dictionnaryHelperMessage.hasOwnProperty(projectType))
		{
	 		if (projectType === 'plugin' || projectType === 'module')
	 		{	
				//Update input
	 			projectNameInput.placeholder = dictionnaryHelperMessage[projectType].hasOwnProperty('placeholder')?dictionnaryHelperMessage[projectType]['placeholder']:'';

				//Update help message
				helpMessageDiv.innerHTML = '';
				Object.entries(dictionnaryHelperMessage[projectType]).forEach(([key, value]) => {
					
					if(key!=='placeholder'){
						const newSpan = document.createElement("span");
			 			const newIcon = document.createElement("i");
			 			const textNode = document.createTextNode(value);
			 	   	  		
			 			newSpan.id = key+'-help-message-span';
			 			newIcon.id = key+'-help-icon';
			 	   	  	
						newIcon.classList.add('mx-1');
							
			 			newSpan.appendChild(newIcon);
			 			newSpan.appendChild(textNode);
			 	   	  		
			 			helpMessageDiv.appendChild(newSpan);	
					}
					
		       });
		   	}
		   	else
		   	{
				projectNameInput.placeholder = '';
				helpMessageDiv.innerHTML = '';
		   	}
		}
		else
		{	
			projectNameInput.placeholder = '';
			helpMessageDiv.innerHTML = '';
		}
	}
	
	updateFormFront(strPluginFormId);
}

/* Function to auto fill the form of business class (In Business section : pluginwizard_create_business_class.html) */
function autoFillBusinessClassForm(strBusinessClassFormId)
{
	
	const MAX_SQL = 64;
	
	// Select plugin name value
    const strPluginName = document.getElementById('plugin_name').value.replaceAll('-','_');
	
    // Select form inputs		
	const businessClassNameInput = document.getElementById('businessClassName-input');
    const pluralBusinessClassNameInput = document.getElementById('pluralBusinessClassName-input');
    const businesstableNameInput = document.getElementById('businessTableName-input');
    
	//erase forbidden caracters
	var strCleanBusinessClassName = businessClassNameInput.value.replace(/[^a-zA-Z _]/g,"");
	
	//Formated names
	var strBusinessClassNameFormated = strCleanBusinessClassName.replace(/[_\s]+(.)/g, (_, letter) => letter.toUpperCase()).replace(/[ _]/g,"");
	strBusinessClassNameFormated = strBusinessClassNameFormated.charAt(0).toUpperCase() + strBusinessClassNameFormated.slice(1)
	
	//Assign values ​​to form inputs
	businessClassNameInput.value = strBusinessClassNameFormated;
	pluralBusinessClassNameInput.value = pluralize(strBusinessClassNameFormated);
	businesstableNameInput.value = (strPluginName+strBusinessClassNameFormated).replace(/([A-Z])/g, '_$1').toLowerCase().slice(0,MAX_SQL);
	
	//Update help message spans associated with all form inputs
	updateFormFront(strBusinessClassFormId);
}

/* Function to auto fill the form of the admin feature (in Administration section : pluginwizard_create_admin_feature.html) */
function autoFillAdminFeatureForm(strAdminFeatureFormId)
{
	
	const MAX_LENGTH_INPUT_DEFAULT = 255;
	    
	// Select inputs
    const featureTitleInput = document.querySelector('[name="feature_title"]');
    const featureNameInput = document.querySelector('[name="feature_name"]');
    const featureRightInput = document.querySelector('[name="feature_right"]');

 	// Select plugin name value
    const pluginName = document.querySelector('[name="plugin_name"]').value.replaceAll('-','_');
 
    //Get maxLength when it exist
    const max_length_featureName = featureNameInput.hasAttribute('maxLength')?featureNameInput.maxLength:MAX_LENGTH_INPUT_DEFAULT;
    const max_length_RightInput = featureRightInput.hasAttribute('maxLength')?featureRightInput.maxLength:MAX_LENGTH_INPUT_DEFAULT;
    
	// Clean and format the feature title
    const cleanFeatureTitleInput = featureTitleInput.value.toLowerCase().replace(/[^a-z _]/g, "").split(/[\s,"_"]+/).map((x=>x.charAt(0).toUpperCase()+x.slice(1))).join('');
   	
	//Assign new values ​​to form inputs
    featureNameInput.value = ("Manage"+cleanFeatureTitleInput).slice(0,max_length_featureName);
    featureRightInput.value = (pluginName.toUpperCase()+"_MANAGEMENT"+cleanFeatureTitleInput.replace(/([A-Z])/g, '_$1').toUpperCase()).slice(0,max_length_RightInput);
	
	//Update help message spans associated with all form inputs
	updateFormFront(strAdminFeatureFormId);
}