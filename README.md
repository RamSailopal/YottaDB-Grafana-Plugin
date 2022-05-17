# Grafana Datasource plugin for YottaDB

This is a data source plugin for Grafana that pulls in cumulative and point in time metrics from a backend YottaDB metrics server.

# Installation in Grafana

    cd /tmp
    wget --no-check-certificate 'https://drive.google.com/uc?export=download&id=1zguimw7O5NXkMFgNvnSmeJGiK1KozQbf&confirm=t' -O 'yottadbmetric.zip'
    cd /var/lib/grafana/plugins
    unzip /tmp/yottadbmetric.zip
    sed -i 's/^;allow_loading_unsigned_plugins =/allow_loading_unsigned_plugins = ramsailopal-yottadbmetrics/' /etc/grafana/grafana.ini
    
 Restart YottaDB
 
 # Functionality
 
 This "front end" plugin relies on a YottaDB metrics back end server to operate. For details on setting up the back end server, please see here:
 
 http://github.com
 
 
 
 
 
