/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.paris.lutece.plugins.pluginwizard.service.generator;

import fr.paris.lutece.plugins.pluginwizard.business.model.Attribute;
import fr.paris.lutece.plugins.pluginwizard.business.model.BusinessClass;
import fr.paris.lutece.plugins.pluginwizard.business.model.Feature;
import fr.paris.lutece.plugins.pluginwizard.business.model.PluginModel;
import fr.paris.lutece.portal.service.plugin.Plugin;
import fr.paris.lutece.portal.service.plugin.PluginService;
import fr.paris.lutece.test.LuteceTestCase;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Multi Jsp Bean Generator Test
 */
public class MultiJspBeanGeneratorTest extends LuteceTestCase
{

    /**
     * Test of generate method, of class MultiJspBeanGenerator.
     */
    @Test
    public void testGenerate()
    {
        System.out.println("generate");
        Plugin plugin = PluginService.getPlugin("pluginwizard");
        PluginModel pluginModel = new PluginModel();
        pluginModel.setIdPlugin(1);
        pluginModel.setPluginName("MyPlugin");
        Feature feature = new Feature();
        feature.setIdPlugin(1);
        feature.setPluginFeatureName("MyFeature");
        feature.setPluginFeatureRight("RIGHT_FEATURE");

        List<Feature> listFeatures = new ArrayList<Feature>();
        listFeatures.add(feature);
        pluginModel.setPluginFeatures(listFeatures);
        BusinessClass business = new BusinessClass();
        business.setBusinessClass("MyClass");
        business.setPackageName("mypackage");
       
        List<Attribute> listAttributes = new ArrayList<Attribute>();
        Attribute attributeKey = new Attribute();
        attributeKey.setAttributeName("mykey");
        attributeKey.setIsPrimary(true);
        attributeKey.setAttributeType("String");
        listAttributes.add(attributeKey);
        Attribute attributeDesc = new Attribute();
        attributeDesc.setAttributeName("myDesc");
        attributeDesc.setIsPrimary(true);
        attributeDesc.setAttributeType("String");
        listAttributes.add(attributeDesc);
        business.setAttributes(listAttributes);

        feature.addBusinessClass(business);
       
        MultiJspBeanGenerator instance = new MultiJspBeanGenerator();
        Map map = instance.generate(plugin, pluginModel);

        Iterator i = map.keySet().iterator();
        while (i.hasNext())
        {
            String strPath = (String) i.next();
            System.out.println(strPath);
            System.out.println(map.get(strPath));
        }
    }
}