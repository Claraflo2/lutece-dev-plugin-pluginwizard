package fr.paris.lutece.plugins.pluginwizard.business.model;

import java.io.Serializable;

public class Configuration implements Serializable{


	 private static final long serialVersionUID = 1L;
	 private int _nId;
	 private String _strWorkflowFormConfigRequired;
	 private String _strWorkflowFormTaskRequired;
	 private String _strWorkflowTaskForAutomaticAction;
	 private String _strWorkflowTaskScope;

	 
	 /**
	  Constructor
	  **/
	 
	 public Configuration()
	 {
		 //Default configuration
		 _strWorkflowFormConfigRequired="0";
		 _strWorkflowFormTaskRequired="0";
		 _strWorkflowTaskForAutomaticAction="0";
		 _strWorkflowTaskScope="prototype";		 
	 }
	 
    /**
     * Returns the Id
     * 
     * @return The Id
     */
    public int getId( )
    {
        return _nId;
    }

    /**
     * Sets the Id
     * 
     * @param nId
     *            The Id
     */
    public void setId( int nId )
    {
        _nId = nId;
    }
   
    
    /**
     * Returns WorkflowFormConfigRequired
     * 
     * @return The WorkflowFormConfigRequired
     *      */
    public String getWorkflowFormConfigRequired( )
    {
        return _strWorkflowFormConfigRequired;
    }

    /**
     * Sets the WorkflowFormConfigRequired
     * 
     * @param strWorkflowFormConfigRequired
     *            The WorkflowFormConfigRequired
     */
    public void setWorkflowFormConfigRequired( String strWorkflowFormConfigRequired )
    {
    	_strWorkflowFormConfigRequired = strWorkflowFormConfigRequired;
    }

    /**
     * Returns the WorkflowFormTaskRequired
     * 
     * @return The WorkflowFormTaskRequired
     */
    public String getWorkflowFormTaskRequired( )
    {
        return _strWorkflowFormTaskRequired;
    }

    /**
     * Sets the WorkflowFormTaskRequired
     * 
     * @param strWorkflowFormTaskRequired
     *            The WorkflowFormTaskRequired
     */
    public void setWorkflowFormTaskRequired( String strWorkflowFormTaskRequired )
    {
        _strWorkflowFormTaskRequired = strWorkflowFormTaskRequired;
    }

    /**
     * Returns the WorkflowTaskForAutomaticAction
     * 
     * @return The WorkflowTaskForAutomaticAction
     */
    public String getWorkflowTaskForAutomaticAction( )
    {
        return _strWorkflowTaskForAutomaticAction;
    }

    /**
     * Sets the WorkflowTaskForAutomaticAction
     * 
     * @param strWorkflowTaskForAutomaticAction
     *            The WorkflowTaskForAutomaticAction
     */
    public void setWorkflowTaskForAutomaticAction( String strWorkflowTaskForAutomaticAction )
    {
        _strWorkflowTaskForAutomaticAction = strWorkflowTaskForAutomaticAction;
    }
    
    /**
     * Returns the WorkflowTaskScope
     * 
     * @return The WorkflowTaskScope
     */
    public String getWorkflowTaskScope( )
    {
        return _strWorkflowTaskScope;
    }

    /**
     * Sets the WorkflowTaskScope
     * 
     * @param strWorkflowTaskScope
     *            The WorkflowTaskScope
     */
    public void setWorkflowTaskScope( String strWorkflowTaskScope )
    {
        _strWorkflowTaskScope = strWorkflowTaskScope;
    }
}
