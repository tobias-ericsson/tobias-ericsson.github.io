@Grab('org.ccil.cowan.tagsoup:tagsoup:1.2.1')
import org.ccil.cowan.tagsoup.Parser

if (args.length <= 0) {
    println "missing filename"
    System.exit(1)
}

/* read file from args */
def file = args[0]

def slurper = new XmlSlurper(new Parser())

def rootNode = slurper.parse(new File(file))

def trs = rootNode.depthFirst().findAll { it.name() == 'tr' }
trs.each { it ->
    it.td.eachWithIndex { td, index ->
        println index + " " + td
    }
}
