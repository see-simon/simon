package studentexamauth.backend.arduino;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class Arduino {
    @Id
    @GeneratedValue
    private int id;
    private int fingerPrintId;
    private String ipAddress;

    public Arduino() {
    }

    public Arduino(int id, int fingerPrintId, String ipAddress) {
        this.id = id;
        this.fingerPrintId = fingerPrintId;
        this.ipAddress = ipAddress;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFingerPrintId() {
        return fingerPrintId;
    }

    public void setFingerPrintId(int fingerPrintId) {
        this.fingerPrintId = fingerPrintId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
}
