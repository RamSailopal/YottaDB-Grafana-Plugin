# Grafana Datasource plugin for YottaDB

This is a data source plugin for Grafana that pulls in cumulative and point in time metrics from a backend YottaDB metrics server.

# Installation in Grafana

    cd /tmp
    wget --no-check-certificate 'https://drive.google.com/uc?export=download&id=1zguimw7O5NXkMFgNvnSmeJGiK1KozQbf&confirm=t' -O 'yottadbmetric.zip'
    cd /var/lib/grafana/plugins
    unzip /tmp/yottadbmetric.zip
    sed -i 's/^;allow_loading_unsigned_plugins =/allow_loading_unsigned_plugins = ramsailopal-yottadbmetrics/' /etc/grafana/grafana.ini
    sed -i 's/^;enable_gzip = false/enable_gzip = true/' /etc/grafana/grafana.ini
    
 Restart YottaDB
 
 # Functionality
 
 This "front end" plugin relies on a YottaDB metrics back end server to operate. For details on setting up the back end server, please see here:
 
 https://github.com/RamSailopal/YottaDB-Grafana-Server
 
On first using the plugin as a datasource for a dashboard panel, the plugin will acculumate all cumulative metrics over time. In order to see specific metrics, click on the individual label as in the graphic below which show SET metrics
 
 ![Alt text](Grafana-SET.JPG?raw=true "SET metric")
 
 The field **CUM,POT or CUS** will dictate the catergory of metrics to attain:
 
 **CUM** - Cumulative metrics over time
 
 **POT** - Metrics over a single point of time
 
 **CUS** - Custom metrics. Calling a specific function and routine to attain metrics.
 
 The field **YottaDB region** will dictate the YottaDB region to attain metrics for. Left blank, the region will be the default, **DEFAULT** region

 The **Number of records to attain** field will dictate how many records are "pulled" from the back end API server. Enter **all** for all available data. 
 
 **NOTE - A higher count will effect performance**
 
 All other fields are specific to custom metrics

 # Custom Metrics
 
 Following on from the grafana-server README (linked above) An example of the use of custom metrics is shown in the link below:
 
 [![IMAGE ALT TEXT HERE](https://i.ytimg.com/an_webp/sUF-Hgsrkiw/mqdefault_6s.webp?du=3000&sqp=CPCCk5QG&rs=AOn4CLCnBtoOGJzz8oc41JluCQL_s92tIg)](https://www.youtube.com/watch?v=sUF-Hgsrkiw)
 
 https://www.youtube.com/watch?v=sUF-Hgsrkiw
 
 As fields are type independant when first attained, they will need to be set from the default string type to time/numeric types with transformation/field conversion.
 
